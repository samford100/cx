from flask import Flask, render_template, jsonify, request

import pandas as pd
import numpy as np
import re
import csv
import random
from sklearn.externals import joblib
from sklearn.ensemble import RandomForestClassifier as rf
import pandas as pd


app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

@app.route("/")
def index():
    return render_template("index.html")

# api routes
@app.route("/api/train_death", methods=['GET'])
def train_death():
    # check if model is already created
    try:
        clf = joblib.load('./data/model')
        print(clf)
        if clf is not None:
            print('model clf already exists')
            response = jsonify({'train': True})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
    except Exception:
        print('model not yet created')

    data = read_and_clean_data()
    x_train, x_test, y_train, y_test = split_data(data, test_size=.001)
    model = create_model(x_train, y_train)

    joblib.dump(model, './data/model')
    joblib.dump(x_test, './data/x_test')
    joblib.dump(y_test, './data/y_test')

    response = jsonify({'train': True})
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/api/test_death", methods=['GET'])
def test_death():
    print("test death")
    try:
        model = joblib.load('./data/model')
        x_test = joblib.load('./data/x_test')
        y_test = joblib.load('./data/y_test')
        # print(x_test)
        print(list(x_test))
        print('~~~~~')
        print(list(y_test))

        prediction = model.predict(x_test)
        print('prediction')
        treeScore = model.score(x_test, y_test)
        print('treeScore', treeScore)
        response = jsonify({'test': True})
        return response

    except Exception as e:
        print(e)
        response = jsonify({'test': False})
        return response

@app.route("/api/get_death", methods=['POST'])
def get_death():
    print('get death')
    content = request.get_json()
    # content = {
    #   detail_age: "23", 
    #   race: "18", 
    #   sex: "M", 
    #   education_2003_revision: "1", 
    #   marital_status: "S"
    # }
    try:
        model = joblib.load('./data/model')
        prediction = model.predict_proba(content)
        




        return response

    except Exception as e:
        print(e)
        response = jsonify({'test': False})
        return response



    print(content)
    return jsonify({'tested_it': True})

#helpers
def create_model(x_train, y_train):
    from sklearn import tree
    # from sklearn.ensemble import GradientBoostingClassifier
    # from sklearn import svm
    # from sklearn.neural_network import MLPClassifier
    # model = svm.SVC().fit(x_train, y_train)
    # from sklearn.neighbors.nearest_centroid import NearestCentroid
    # model = NearestCentroid().fit()
    # model = MLPClassifier(solver='lbfgs', alpha=1e-5, hidden_layer_sizes=(5, 2), random_state=1).fit(x_train,y_train)
    model = tree.DecisionTreeClassifier().fit(x_train, y_train)
    # model = GradientBoostingClassifier(n_estimators=100, learning_rate=1.0, max_depth=1, random_state=0).fit(x_train, y_train)
    return model

def split_data(data, test_size=.1):
    from sklearn.model_selection import train_test_split
    n_train = data.drop(['39_cause_recode'], axis=1)
    z_test = data
    x_train, x_test, y_train, y_test = train_test_split(n_train, z_test['39_cause_recode'].ravel(), test_size=test_size, random_state=5)
    return x_train, x_test, y_train, y_test


def read_and_clean_data():
    data = pd.read_csv('./data/intermediate_clean_2015_deaths.csv')

    print('read data from csv') # this is quick


    #CONSOLIDATE RACE COLUMN
    data['race'] = data['race'].replace(8,68)
    data['race'] = data['race'].replace(78,68)

    #SET GENDER TO BINARY
    data['sex'] = data['sex'].map({'F':0, 'M': 1}).astype(int)

    #MAP MARITAL STATUS AND INJURY AT WORK TO INTEGERS
    title_mapping = {"M": 1, "W": 2, "S": 3, "D": 4}
    data['marital_status'] = data['marital_status'].map(title_mapping)

    title_mapping = {"U": 1, "N": 0}
    data['injury_at_work'] = data['injury_at_work'].map(title_mapping)

    column_names = ['resident_status', 'education_2003_revision', 'education_reporting_flag',
                'month_of_death', 'sex', 'detail_age_type', 'detail_age',
                'place_of_death_and_decedents_status', 'marital_status',
                'day_of_week_of_death', 'current_data_year',
                'injury_at_work', 'manner_of_death', 'activity_code',
                'place_of_injury_for_causes_w00_y34_except_y06_and_y07_',
                '39_cause_recode', 'race']

    #FILL ALL BLANK CELLS
    for each in column_names:
        data[each] = data[each].fillna(0)

    one_hot = ['resident_status', 'education_2003_revision', 'education_reporting_flag',
                     'sex', 'detail_age_type',
                    'place_of_death_and_decedents_status', 'marital_status',
                    'day_of_week_of_death',
                    'injury_at_work', 'manner_of_death', 'activity_code',
                    'place_of_injury_for_causes_w00_y34_except_y06_and_y07_', 'race']



    #ONE HOT ENCODING
    data = pd.get_dummies(data, columns=one_hot)
    print('one hot encoded') # this is quick
    return data




if __name__ == "__main__":
    app.run()