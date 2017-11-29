from flask import Flask, render_template, jsonify, request

import pandas as pd
import numpy as np
import re
import csv
import random
from sklearn.externals import joblib
from sklearn.ensemble import RandomForestClassifier as rf
import pandas as pd

cause_lookup = {"01": "Tuberculosis (A16-A19)", "02": "Syphilis (A50-A53)", "03": "Human immunodeficiency virus (HIV) disease (B20-B24)", "04": "Malignant neoplasms (C00-C97)", "05": "Malignant neoplasm of stomach (C16)", "06": "Malignant neoplasms of colon, rectum and anus (C18-C21)", "07": "Malignant neoplasm of pancreas (C25)",
"08": "Malignant neoplasms of trachea, bronchus and lung (C33-C34)", "09": "Malignant neoplasm of breast (C50)", "010": "Malignant neoplasms of cervix uteri, corpus uteri and ovary (C53-C56)", "011": "Malignant neoplasm of prostate (C61)", "012": "Malignant neoplasms of urinary tract (C64-C68)", "013": "Non-Hodgkin's lymphoma (C82-C85)",
"014": "Leukemia (C91-C95)", "015": "Other malignant neoplasms (C00-C15,C17,C22-C24,C26-C32,C37-C49,C51-C52, C57-C60,C62-C63,C69-C81,C88,C90,C96-C97)", "016": "Diabetes mellitus (E10-E14)", "017": "Alzheimer's disease (G30)", "018": "Major cardiovascular diseases (I00-I78)", "019": "Diseases of heart (I00-I09,I11,I13,I20-I51)",
"020": "Hypertensive heart disease with or without renal disease (I11,I13)", "021": "Ischemic heart diseases (I20-I25)", "022": "Other diseases of heart (I00-I09,I26-I51)", "023": "Essential (primary) hypertension and hypertensive renal disease (I10,I12,I15)", "024": "Cerebrovascular diseases (I60-I69)", "025": "Atherosclerosis (I70)",
"026": "Other diseases of circulatory system (I71-I78)", "027": "Influenza and pneumonia (J09-J18)", "028": "Chronic lower respiratory diseases (J40-J47)", "029": "Peptic ulcer (K25-K28)", "030": "Chronic liver disease and cirrhosis (K70,K73-K74)", "031": "Nephritis, nephrotic syndrome, and nephrosis (N00-N07,N17-N19,N25-N27)",
"032": "Pregnancy, childbirth and the puerperium (O00-O99)", "033": "Certain conditions originating in the perinatal period (P00-P96)", "034": "Congenital malformations, deformations and chromosomal abnormalities (Q00-Q99)", "035": "Sudden infant death syndrome (R95)",
"036": "Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified (excluding Sudden infant death syndrome) (R00-R94,R96-R99)", "037": "All other diseases (Residual) (A00-A09,A20-A49,A54-B19,B25-B99,D00-E07, E15-G25,G31-H93,I80-J06,J20-J39,J60-K22,K29-K66,K71-K72, K75-M99,N10-N15,N20-N23,N28-N98,U04)",
 "038": "Motor vehicle accidents (V02-V04,V09.0,V12-V14,V19.0-V19.2,V19.4-V19.6, V20-V79,V80.3-V80.5,V81.0-V81.1,V82.0-V82.1,V83-V86,V87.0-V87.8, V88.0-V88.8,V89.0,V89.2)",
 "039": "All other and unspecified accidents and adverse effects (V01,V05-V06,V09.1,V09.3-V09.9,V10-V11,V15-V18,V19.3,V19.8-V19.9, V80.0-V80.2,V80.6-V80.9,V81.2-V81.9,V82.2-V82.9,V87.9,V88.9,V89.1, V89.3,V89.9,V90-X59,Y40-Y86,Y88)", "040": "Intentional self-harm (suicide) (*U03,X60-X84,Y87.0)", "041": "Assault (homicide) (*U01-*U02,X85-Y09,Y87.1)", "042": "All other external causes (Y10-Y36,Y87.2,Y89)"}



app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

@app.route("/")
def index():
    train_death()
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
    x_train, x_test, y_train, y_test = split_data(data, test_size=.1)
    model = create_model(x_train, y_train)

    joblib.dump(model, './data/model')
    joblib.dump(x_test, './data/x_test')
    joblib.dump(y_test, './data/y_test')

    print('done training')
    response = jsonify({'train': True})

    test_death()

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

    # num_steps = 10

    # age = int(content['detail_age'])
    # print('age:', age)
    # step = int((100 - age) / num_steps) # evenly spaced 5 times
    # print(step)

    # for key, value in content.items():
    #     content[key] = [value] * num_steps
    #     # content[key] = [value, value, value, value]

    # print(content)

    # content['detail_age'] = [i*age for i in range(1,num_steps+1)]
    # # content['detail_age'] = [1,2,3,4,5,6,7,8,9,10]
    # content['detail_age'] = [1,2,3,4,5,6,7,8,9,10]
    # print(content)
    # df = pd.DataFrame(data=content)
    # df['sex'] = df['sex'].map({'W':0, 'M': 1}).astype(int)
    # title_mapping = {"M": 1, "W": 2, "S": 3, "D": 4}
    # df['marital_status'] = df['marital_status'].map(title_mapping)


    mycolumns = ['education_2003_revision_0.0', 'education_2003_revision_1.0', 'education_2003_revision_2.0', 'education_2003_revision_3.0', 'education_2003_revision_4.0', 'education_2003_revision_5.0', 'education_2003_revision_6.0', 'education_2003_revision_7.0', 'education_2003_revision_8.0', 'education_2003_revision_9.0', 'sex_F', 'sex_M', 'marital_status_D', 'marital_status_M', 'marital_status_S', 'marital_status_U', 'marital_status_W', 'race_1', 'race_2', 'race_3', 'race_4', 'race_5', 'race_6', 'race_7', 'race_18', 'race_28', 'race_38', 'race_48', 'race_58', 'race_68']

    edu_cols = ['education_2003_revision_0.0', 'education_2003_revision_1.0', 'education_2003_revision_2.0', 'education_2003_revision_3.0', 'education_2003_revision_4.0', 'education_2003_revision_5.0', 'education_2003_revision_6.0', 'education_2003_revision_7.0', 'education_2003_revision_8.0', 'education_2003_revision_9.0']
    sex_cols = ['sex_F', 'sex_M']
    mar_cols = ['marital_status_D', 'marital_status_M', 'marital_status_S', 'marital_status_U', 'marital_status_W']
    race_cols = ['race_1', 'race_2', 'race_3', 'race_4', 'race_5', 'race_6', 'race_7', 'race_18', 'race_28', 'race_38', 'race_48', 'race_58', 'race_68']
    
    new_content = {}

    step = 10
    age = int(content['detail_age'])
    print('age:',age)

    for col in edu_cols:
        print(str(col.rsplit('_',1)[1]) + '.0')
        print(content['education_2003_revision'])
        print('~~~')
        if str(content['education_2003_revision'])+'.0' == col.rsplit('_',1)[1]:
            new_content[col] = [1 for i in range(age, 100, step)]
        else:
            new_content[col] = [0 for i in range(age, 100, step)]
    for col in sex_cols:
        if content['sex'] == col.rsplit('_',1)[1]:
            new_content[col] = [1 for i in range(age, 100, step)]
        else:
            new_content[col] = [0 for i in range(age, 100, step)]
    for col in mar_cols:
        if content['marital_status'] == col.rsplit('_',1)[1]:
            new_content[col] = [1 for i in range(age, 100, step)]
        else:
            new_content[col] = [0 for i in range(age, 100, step)]
    for col in race_cols:
        if int(content['race']) == int(col.rsplit('_',1)[1]):
            new_content[col] = [1 for i in range(age, 100, step)]
        else:
            new_content[col] = [0 for i in range(age, 100, step)]

    # new_content['detail_age'] = [1,2,3,4,5]
    new_content['detail_age'] = [i for i in range(age, 100, step)]
    # print([i for i in range(age, 100, step)])
    print('NEW CONTENT')
    print(new_content)
    df = pd.DataFrame(data=new_content)
    print(df)

    print(df)
    try:
        model = joblib.load('./data/model')
        prediction = model.predict_proba(df)
        print('prediction_proba')
        print(prediction)
        response = {}
        for ind,row in enumerate(df['detail_age']):
            # print('ind:', ind)
            # print(row)
            vals = [float(x) for x in prediction[ind]]
            # print('vals')
            inds = list(enumerate(vals))
            # print('inds', inds)
            vals = list(reversed(sorted(inds, key=lambda x: x[1])))
            # print('vals2')
            # print(vals)
            vals = [x for x in vals if x[0] != 34 and x[0] != 35 and x[0] != 33 and x[0] != 36]
            # print('vals3')
            # print(vals[:3])
            response[str(row)] = [(x[0], x[1], cause_lookup["0"+str(x[0] + 1)]) for x in vals[:3]]
            # print('changed response')

        print(response)
        # print(jsonify(res = response))
        return jsonify(res = response)

    except Exception as e:
        print('error')
        print(e)
        response = jsonify({'test': False})
        return response

#helpers
def create_model(x_train, y_train):
    from sklearn import tree
    from sklearn import linear_model
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.naive_bayes import GaussianNB

    # from sklearn.ensemble import GradientBoostingClassifier
    from sklearn import svm
    # from sklearn.neural_network import MLPClassifier
    # model = svm.SVC().fit(x_train, y_train)
    # from sklearn.neighbors.nearest_centroid import NearestCentroid
    # model = NearestCentroid().fit()
    # model = MLPClassifier(solver='lbfgs', alpha=1e-5, hidden_layer_sizes=(5, 2), random_state=1).fit(x_train,y_train)
    model = tree.DecisionTreeClassifier(max_depth=5).fit(x_train, y_train)

    # print('visualizing')
    # import graphviz 
    # dot_data = tree.export_graphviz(model, out_file=None) 
    # graph = graphviz.Source(dot_data) 
    # graph.render("tree") 
    # model = GradientBoostingClassifier(n_estimators=100, learning_rate=1.0, max_depth=1, random_state=0).fit(x_train, y_train)
    # model = RandomForestClassifier(max_depth=3, random_state=50, n_estimators=50).fit(x_train, y_train)
    # model = RandomForestClassifier(max_depth=6, random_state=50, n_estimators=2).fit(x_train, y_train)
    # model = GaussianNB().fit(x_train, y_train)
    return model

def split_data(data, test_size=.1):
    from sklearn.model_selection import train_test_split
    n_train = data.drop(['39_cause_recode'], axis=1)
    z_test = data
    x_train, x_test, y_train, y_test = train_test_split(n_train, z_test['39_cause_recode'].ravel(), test_size=test_size, random_state=5)
    return x_train, x_test, y_train, y_test


def read_and_clean_data():
    data = pd.read_csv('./data/intermediate_clean_2015_deaths.csv')

    print('read data from csv')  # this is quick

    bad_columns = ['resident_status',  'education_reporting_flag',
                    'month_of_death', 'detail_age_type',
                    'place_of_death_and_decedents_status',
                    'day_of_week_of_death', 'current_data_year',
                    'injury_at_work', 'manner_of_death', 'activity_code',
                    'place_of_injury_for_causes_w00_y34_except_y06_and_y07_']

    #response_column = '39_cause_recode'

    predictor_columns = ['detail_age', 'race', 'sex', 'education_2003_revision', 'marital_status']



    # CONSOLIDATE RACE COLUMN
    data['race'] = data['race'].replace(8, 68)
    data['race'] = data['race'].replace(78, 68)

    # dealing with the detail_age BS

    '''
        1:Years
        2:Months
        4:Days
        5:Hours
        6:Minutes
        9:NaN
    '''

    data = data[data['detail_age_type'] != 9]
    data.loc[data['detail_age_type'] == 2, 'detail_age'] = data['detail_age'] / 12
    data.loc[data['detail_age_type'] == 4, 'detail_age'] = data['detail_age'] / 365
    data.loc[data['detail_age_type'] == 5, 'detail_age'] = data['detail_age'] / (365 * 24)
    data.loc[data['detail_age_type'] == 6, 'detail_age'] = data['detail_age'] / (365 * 24 * 60)


    data = data.drop(bad_columns,axis=1)



    # # SET GENDER TO BINARY
    # data['sex'] = data['sex'].map({'F': 0, 'M': 1}).astype(int)

    # # MAP MARITAL STATUS AND INJURY AT WORK TO INTEGERS
    # title_mapping = {"M": 1, "W": 2, "S": 3, "D": 4}
    # data['marital_status'] = data['marital_status'].map(title_mapping)


    # FILL ALL BLANK CELLS
    for each in predictor_columns:
        data[each] = data[each].fillna(0)

    one_hot = [ 'education_2003_revision', 'sex', 'marital_status','race']

    # ONE HOT ENCODING
    data = pd.get_dummies(data, columns=one_hot)
    # print('one hot encoded')  # this is quick
    print(data[:5])

    print('listdataa')
    print(list(data))
    return data


if __name__ == "__main__":
    app.run()
