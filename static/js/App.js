import React, {Component} from 'react';
import '../css/App.css';
import {
  Pneumonia, 
  Suicide, 
  Diabetes, 
  HeartAttack, 
  Baby,
  Cancer,
  Brain,
  Drink, 
  Car,
  Other,
  HIV,
  Homicide,
  Pregnant,
  Ulcer,
  Breast,
  Uterus,
  Prostate,
  Syphilis,
  Urine,
  Lymphoma,
  Hypertension,
  Blood,
  Kidney,
  Chromosome,
  Burger,
  Colon,
  Pirate,
  Accident
} from './svgs/Icons.js'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      death: null,
      prediction: null,
      deaths: null
    }
  }

  submit = (data) => {
    this.setState({
      deaths: null
    })
    fetch('/api/get_death', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.res)
      this.setState({
        deaths: data.res
      })
    })

  }

  render() {
    // load from source

    return (
      <div className="App">
        <Header />
        <Form submitQuery={this.submitQuery} submit={this.submit} />
        {this.state.deaths ? <Blocks deaths={this.state.deaths} /> : null}
        <Footer />
      </div>
    )
  }
}


class Block extends Component {
  constructor() {
    super()
    this.state = {
      selected: 0
    }
  }

  onHover = (x) => {
    // console.log(x)
    this.setState({
      selected: x
    })
  }

  render() {

    console.log('death')
    console.log(this.props.death)

    const age = this.props.death[0]
    const ways = this.props.death[1]
    // const way1 = ways[0]

    console.log('age:' + age)
    // console.log('ways:' + ways[0])

    const cause_map = {
        "1":
        {
            "name": "Tuberculosis",
            "description": "Tuberculosis (TB) is an infectious disease usually caused by the bacterium Mycobacterium tuberculosis (MTB). Tuberculosis generally affects the lungs, but can also affect other parts of the body. Most infections do not have symptoms, in which case it is known as latent tuberculosis. About 10% of latent infections progress to active disease which, if left untreated, kills about half of those infected. The classic symptoms of active TB are a chronic cough with  blood-containing sputum, fever, night sweats, and weight loss. The historical term 'consumption' came about due to the weight loss. Infection of other organs can cause a wide range of symptoms.",
            "icon": <Pneumonia />
        },
        "2":
        {
            "name": "Syphilis",
            "description": `Syphilis is a sexually transmitted infection caused by the bacterium Treponema pallidum subspecies pallidum. The signs and symptoms of syphilis vary depending in which of the four stages it presents (primary, secondary, latent, and tertiary). The primary stage classically presents with a single chancre (a firm, painless, non-itchy skin ulceration) but there may be multiple sores. In secondary syphilis a diffuse rash occurs, which frequently involves the palms of the hands and soles of the feet. There may also be sores in the mouth or vagina. In latent syphilis, which can last for years, there are few or no symptoms. In tertiary syphilis there are gummas (soft non-cancerous growths), neurological, or heart symptoms. Syphilis has been known as "the great imitator" as it may cause symptoms similar to many other diseases.`,
            "icon":<Syphilis />
        },
        "3":
        {
            "name": "Human immunodeficiency virus (HIV) disease",
            "description": "The human immunodeficiency virus (HIV) is a lentivirus (a subgroup of retrovirus) that causes HIV infection and over time acquired immunodeficiency syndrome (AIDS). AIDS is a condition in humans in which progressive failure of the immune system allows life-threatening opportunistic infections and cancers to thrive. Without treatment, average survival time after infection with HIV is estimated to be 9 to 11 years, depending on the HIV subtype. Infection with HIV occurs by the transfer of blood, pre-ejaculate, semen, vaginal fluids, or breast milk. Within these bodily fluids, HIV is present as both free virus particles and virus within infected immune cells.",
            "icon": <HIV />
        },
        "4":
        {
            "name": "Cancer",
            "description": "Cancer is a group of diseases involving abnormal cell growth with the potential to invade or spread to other parts of the body. These contrast with benign tumors, which do not spread to other parts of the body. Possible signs and symptoms include a lump, abnormal bleeding, prolonged cough, unexplained weight loss, and a change in bowel movements. While these symptoms may indicate cancer, they may have other causes. Over 100 types of cancers affect humans.",
            "icon": <Cancer />
        },
        "5":
        {
            "name": "Cancer of stomach",
            "description": "Stomach cancer, also known as gastric cancer, is cancer developing from the lining of the stomach. Early symptoms may include heartburn, upper abdominal pain, nausea and loss of appetite. Later signs and symptoms may include weight loss, yellowing of the skin and whites of the eyes, vomiting, difficulty swallowing, and blood in the stool among others. The cancer may spread from the stomach to other parts of the body, particularly the liver, lungs, bones, lining of the abdomen and lymph nodes.[10]",
            "icon": <Ulcer />
        },
        "6":
        {
            "name": "Cancer of colon, rectum and anus",
            "description": "Colorectal cancer (CRC), also known as bowel cancer and colon cancer, is the development of cancer from the colon or rectum (parts of the large intestine). A cancer is the abnormal growth of cells that have the ability to invade or spread to other parts of the body. Signs and symptoms may include blood in the stool, a change in bowel movements, weight loss, and feeling tired all the time.",
            "icon":<Colon />
        },
        "7":
        {
            "name": "Cancer of pancreas",
            "description": "Pancreatic cancer arises when cells in the pancreas, a glandular organ behind the stomach, begin to multiply out of control and form a mass. These cancerous cells have the ability to invade other parts of the body.[10] There are a number of types of pancreatic cancer. The most common, pancreatic adenocarcinoma, accounts for about 85% of cases, and the term 'pancreatic cancer' is sometimes used to refer only to that type. These adenocarcinomas start within the part of the pancreas which makes digestive enzymes. Several other types of cancer, which collectively represent the majority of the non-adenocarcinomas, can also arise from these cells. One to two percent of cases of pancreatic cancer are neuroendocrine tumors, which arise from the hormone-producing cells of the pancreas. These are generally less aggressive than pancreatic adenocarcinoma.",
            "icon": <Pirate />
        },
        "8":
        {
            "name": "Cancer of trachea, bronchus and lung",
            "description": "Lung cancer, also known as lung carcinoma, is a malignant lung tumor characterized by uncontrolled cell growth in tissues of the lung.[10] This growth can spread beyond the lung by the process of metastasis into nearby tissue or other parts of the body.[11] Most cancers that start in the lung, known as primary lung cancers, are carcinomas.[12] The two main types are small-cell lung carcinoma (SCLC) and non-small-cell lung carcinoma (NSCLC). The most common symptoms are coughing (including coughing up blood), weight loss, shortness of breath, and chest pains.",
            "icon": <Pneumonia />
        },
        "9":
        {
            "name": "Cancer of breast",
            "description": "Breast cancer is cancer that develops from breast tissue. Signs of breast cancer may include a lump in the breast, a change in breast shape, dimpling of the skin, fluid coming from the nipple, or a red scaly patch of skin. In those with distant spread of the disease, there may be bone pain, swollen lymph nodes, shortness of breath, or yellow skin.",
            "icon": <Breast />
        },
        "10":
        {
            "name": "Cancer of cervix uteri, corpus uteri and ovary",
            "description": "Cervical cancer is a cancer arising from the cervix. It is due to the abnormal growth of cells that have the ability to invade or spread to other parts of the body.[12] Early on, typically no symptoms are seen. Later symptoms may include abnormal vaginal bleeding, pelvic pain, or pain during sexual intercourse. While bleeding after sex may not be serious, it may also indicate the presence of cervical cancer.[13]",
            "icon":<Uterus />
        },
        "11":
        {
            "name": "Cancer of prostate",
            "description": "Prostate cancer is the development of cancer in the prostate, a gland in the male reproductive system. Most prostate cancers are slow growing; however, some grow relatively quickly. The cancer cells may spread from the prostate to other parts of the body, particularly the bones and lymph nodes. It may initially cause no symptoms. In later stages it can lead to difficulty urinating, blood in the urine, or pain in the pelvis, back or when urinating. A disease known as benign prostatic hyperplasia may produce similar symptoms. Other late symptoms may include feeling tired due to low levels of red blood cells.",
            "icon":<Prostate />
        },
        "12":
        {
            "name": "Cancer of urinary tract",
            "description": "Bladder cancer is any of several types of cancer arising from the tissues of the urinary bladder. It is a disease in which cells grow abnormally and have the potential to spread to other parts of the body. Symptoms include blood in the urine, pain with urination, and low back pain.",
            "icon":<Urine />
        },
        "13":
        {
            "name": "Non-Hodgkin's lymphoma",
            "description": "Non-Hodgkin lymphoma (NHL) is a group of blood cancers that includes all types of lymphoma except Hodgkin's lymphomas. Symptoms include enlarged lymph nodes, fever, night sweats, weight loss, and tiredness. Other symptoms may include bone pain, chest pain, or itchiness. Some forms are slow growing while others are fast growing.",
            "icon":<Lymphoma />
        },
        "14":
        {
            "name": "Leukemia",
            "description": "Leukemia, also spelled leukaemia, is a group of cancers that usually begin in the bone marrow and result in high numbers of abnormal white blood cells. These white blood cells are not fully developed and are called blasts or leukemia cells. Symptoms may include bleeding and bruising problems, feeling tired, fever, and an increased risk of infections. These symptoms occur due to a lack of normal blood cells. Diagnosis is typically made by blood tests or bone marrow biopsy.",
            "icon":<Blood />
        },
        "15":
        {
            "name": "Other Cancer",
            "description": "Cancer is a group of diseases involving abnormal cell growth with the potential to invade or spread to other parts of the body. These contrast with benign tumors, which do not spread to other parts of the body. Possible signs and symptoms include a lump, abnormal bleeding, prolonged cough, unexplained weight loss, and a change in bowel movements. While these symptoms may indicate cancer, they may have other causes. Over 100 types of cancers affect humans.",
            "icon": <Cancer />
        },
        "16":
        {
            "name": "Diabetes mellitus",
            "description": "Diabetes mellitus (DM), commonly referred to as diabetes, is a group of metabolic disorders in which there are high blood sugar levels over a prolonged period. Symptoms of high blood sugar include frequent urination, increased thirst, and increased hunger. If left untreated, diabetes can cause many complications. Acute complications can include diabetic ketoacidosis, hyperosmolar hyperglycemic state, or death. Serious long-term complications include cardiovascular disease, stroke, chronic kidney disease, foot ulcers, and damage to the eyes.",
            "icon": <Diabetes />
        },
        "17":
        {
            "name": "Alzheimer's disease",
            "description": "Alzheimer's disease (AD), also referred to simply as Alzheimer's, is a chronic neurodegenerative disease that usually starts slowly and worsens over time. It is the cause of 60% to 70% of cases of dementia. The most common early symptom is difficulty in remembering recent events (short-term memory loss). As the disease advances, symptoms can include problems with language, disorientation (including easily getting lost), mood swings, loss of motivation, not managing self care, and behavioural issues. As a person's condition declines, they often withdraw from family and society. Gradually, bodily functions are lost, ultimately leading to death.[10] Although the speed of progression can vary, the average life expectancy following diagnosis is three to nine years.[11]",
            "icon": <Brain />
        },
        "18":
        {
            "name": "Major cardiovascular diseases",
            "description": "Cardiovascular disease (CVD) is a class of diseases that involve the heart or blood vessels. Cardiovascular disease includes coronary artery diseases (CAD) such as angina and myocardial infarction (commonly known as a heart attack). Other CVDs include stroke, heart failure, hypertensive heart disease, rheumatic heart disease, cardiomyopathy, heart arrhythmia, congenital heart disease, valvular heart disease, carditis, aortic aneurysms, peripheral artery disease, thromboembolic disease, and venous thrombosis.",
            "icon":<HeartAttack />
        },
        "19":
        {
            "name": "Diseases of heart",
            "description": "Cardiovascular disease (CVD) is a class of diseases that involve the heart or blood vessels. Cardiovascular disease includes coronary artery diseases (CAD) such as angina and myocardial infarction (commonly known as a heart attack). Other CVDs include stroke, heart failure, hypertensive heart disease, rheumatic heart disease, cardiomyopathy, heart arrhythmia, congenital heart disease, valvular heart disease, carditis, aortic aneurysms, peripheral artery disease, thromboembolic disease, and venous thrombosis.",
            "icon":<HeartAttack />
        },
        "20":
        {
            "name": "Hypertensive heart disease with or without renal disease",
            "description":"Hypertensive heart disease includes a number of complications of high blood pressure that affect the heart. While there are several definitions of hypertensive heart disease in the medical literature, the term is most widely used in the context of the International Classification of Diseases (ICD) coding categories. The definition includes heart failure and other cardiac complications of hypertension when a causal relationship between the heart disease and hypertension is stated or implied on the death certificate. In 2013 hypertensive heart disease resulted in 1.07 million deaths as compared with 630,000 deaths in 1990.",
            "icon":<HeartAttack />
        },
        "21":
        {
            "name": "Ischemic heart diseases",
            "description": "Coronary artery disease (CAD), also known as ischemic heart disease (IHD),[13] is a group of diseases that includes: stable angina, unstable angina, myocardial infarction, and sudden cardiac death.[14] It is within the group of cardiovascular diseases of which it is the most common type.[15] A common symptom is chest pain or discomfort which may travel into the shoulder, arm, back, neck, or jaw. Occasionally it may feel like heartburn. Usually symptoms occur with exercise or emotional stress, last less than a few minutes, and get better with rest. Shortness of breath may also occur and sometimes no symptoms are present. Occasionally, the first sign is a heart attack. Other complications include heart failure or an irregular heartbeat.",
            "icon": <HeartAttack />
        },
        "22":
        {
            "name": "Other diseases of heart",
            "description": "Cardiovascular disease (CVD) is a class of diseases that involve the heart or blood vessels. Cardiovascular disease includes coronary artery diseases (CAD) such as angina and myocardial infarction (commonly known as a heart attack). Other CVDs include stroke, heart failure, hypertensive heart disease, rheumatic heart disease, cardiomyopathy, heart arrhythmia, congenital heart disease, valvular heart disease, carditis, aortic aneurysms, peripheral artery disease, thromboembolic disease, and venous thrombosis",
            "icon":<HeartAttack />
        },
        "23":
        {
            "name": "Essential (primary) hypertension and hypertensive renal disease",
            "description": "Essential hypertension (also called primary hypertension or idiopathic hypertension) is the form of hypertension that by definition has no identifiable cause. It is the most common type of hypertension, affecting 95% of hypertensive patients, it tends to be familial and is likely to be the consequence of an interaction between environmental and genetic factors. Prevalence of essential hypertension increases with age, and individuals with relatively high blood pressure at younger ages are at increased risk for the subsequent development of hypertension. Hypertension can increase the risk of cerebral, cardiac, and renal events.",
            "icon":<Hypertension />
        },
        "24":
        {
            "name": "Cerebrovascular diseases",
            "description": "erebrovascular diseases are medical conditions that affect the blood vessels of the brain and the cerebral circulation. Arteries supplying oxygen and nutrients to the brain are often damaged or deformed in these disorders. The most common presentation of a cerebrovascular disease is an ischemic stroke or mini-stroke and sometimes a hemorrhagic stroke. Hypertension (high blood pressure) is the most important contributing risk factor for stroke and cerebrovascular diseases as it can change the structure of blood vessels and result in atherosclerosis. Atherosclerosis narrows blood vessels in the brain, resulting in decreased cerebral perfusion. Other risk factors that contribute to stroke include smoking and diabetes. Narrowed cerebral arteries can lead to ischemic stroke, but continually elevated blood pressure can also cause tearing of vessels, leading to a hemorrhagic stroke.",
            "icon":<Brain />
        },
        "25":
        {
            "name": "Atherosclerosis",
            "description": "Atherosclerosis is a disease in which the inside of an artery narrows due to the build of plaque. Initially there are generally no symptoms. When severe it can result in coronary artery disease, stroke, peripheral artery disease, or kidney problems depending on the arteries which are affected. Symptoms, if they occur, generally do not begin until middle age.",
            "icon":<Burger />
        },
        "26":
        {
            "name": "Other diseases of circulatory system",
            "description": "Cardiovascular disease (CVD) is a class of diseases that involve the heart or blood vessels. Cardiovascular disease includes coronary artery diseases (CAD) such as angina and myocardial infarction (commonly known as a heart attack). Other CVDs include stroke, heart failure, hypertensive heart disease, rheumatic heart disease, cardiomyopathy, heart arrhythmia, congenital heart disease, valvular heart disease, carditis, aortic aneurysms, peripheral artery disease, thromboembolic disease, and venous thrombosis.",
            "icon":<HeartAttack />
        },
        "27":
        {
            "name": "Influenza and pneumonia",
            "description": "Influenza, commonly known as 'the flu', is an infectious disease caused by an influenza virus. Symptoms can be mild to severe. The most common symptoms include: a high fever, runny nose, sore throat, muscle pains, headache, coughing, and feeling tired. These symptoms typically begin two days after exposure to the virus and most last less than a week. The cough, however, may last for more than two weeks. In children, there may be nausea and vomiting, but these are not common in adults. Nausea and vomiting occur more commonly in the unrelated infection gastroenteritis, which is sometimes inaccurately referred to as 'stomach flu' or '24-hour flu'. Complications of influenza may include viral pneumonia, secondary bacterial pneumonia, sinus infections, and worsening of previous health problems such as asthma or heart failure.",
            "icon": <Pneumonia />
        },
        "28":
        {
            "name": "Chronic lower respiratory diseases",
            "description": "Asthma is a common long-term inflammatory disease of the airways of the lungs. It is characterized by variable and recurring symptoms, reversible airflow obstruction, and bronchospasm.[10] Symptoms include episodes of wheezing, coughing, chest tightness, and shortness of breath. These episodes may occur a few times a day or a few times per week. Depending on the person, they may become worse at night or with exercise.",
            "icon": <Pneumonia />
        },
        "29":
        {
            "name": "Peptic ulcer",
            "description": "Peptic ulcer disease (PUD) is a break in the lining of the stomach, first part of the small intestine or occasionally the lower esophagus. An ulcer in the stomach is known as a gastric ulcer while that in the first part of the intestines is known as a duodenal ulcer. The most common symptoms of a duodenal ulcer are waking at night with upper abdominal pain or upper abdominal pain that improves with eating. With a gastric ulcer the pain may worsen with eating. The pain is often described as a burning or dull ache. Other symptoms include belching, vomiting, weight loss, or poor appetite. About a third of older people have no symptoms. Complications may include bleeding, perforation and blockage of the stomach. Bleeding occurs in as many as 15% of people.",
            "icon": <Ulcer />
        },
        "30":
        {
            "name": "Chronic liver disease and cirrhosis",
            "description": "Cirrhosis is a condition in which the liver does not function properly due to long-term damage. This damage is characterized by the replacement of normal liver tissue by scar tissue. Typically, the disease develops slowly over months or years. Early on, there are often no symptoms. As the disease worsens, a person may become tired, weak, itchy, have swelling in the lower legs, develop yellow skin, bruise easily, have fluid build up in the abdomen, or develop spider-like blood vessels on the skin. The fluid build-up in the abdomen may become spontaneously infected. Other complications include hepatic encephalopathy, bleeding from dilated veins in the esophagus or dilated stomach veins, and liver cancer. Hepatic encephalopathy results in confusion and may lead to unconsciousness.",
            "icon":<Drink />
        },
        "31":
        {
            "name": "Nephritis, nephrotic syndrome, and nephrosis",
            "description": "Nephritis is inflammation of the kidneys and may involve the glomeruli, tubules, or interstitial tissue surrounding the glomeruli and tubules.",
            "icon":<Kidney />
        },
        "32":
        {
            "name": "Pregnancy, childbirth and the puerperium",
            "description": "A postpartum period or postnatal period is the period beginning immediately after the birth of a child and extending for about six weeks. Less frequently used are the terms puerperium or puerperal period. The World Health Organization (WHO) describes the postnatal period as the most critical and yet the most neglected phase in the lives of mothers and babies; most deaths occur during the postnatal period. It is the time after birth, a time in which the mother's body, including hormone levels and uterus size, returns to a non-pregnant state. Lochia is postpartum vaginal discharge, containing blood, mucus, and uterine tissue.",
            "icon":<Pregnant />
        },
        "33":
        {
            "name": "Certain conditions originating in the perinatal period",
            "description": "Perinatal mortality (PNM), also perinatal death, refers to the death of a fetus or neonate and is the basis to calculate the perinatal mortality rate. Variations in the precise definition of the perinatal mortality exist specifically concerning the issue of inclusion or exclusion of early fetal and late neonatal fatalities. The World Health Organization defines perinatal mortality as the 'number of stillbirths and deaths in the first week of life per 1,000 total births, the perinatal period commences at 22 completed weeks (154 days) of gestation and ends seven completed days after birth', but other definitions have been used.",
            "icon":<Baby />
        },
        "34":
        {
            "name": "Congenital malformations, deformations and chromosomal abnormalities",
            "description": "A congenital disorder, also known as birth defect, is a condition existing at or before birth regardless of cause. Of these disorders, those characterized by structural deformities are termed 'congenital anomalies' and involve defects in a developing fetus. Birth defects vary widely in cause and symptoms. Any substance that causes birth defects is known as a teratogen. Some disorders can be detected before birth through prenatal diagnosis (screening).",
            "icon":<Chromosome />
        },
        "35":
        {
            "name": "Sudden infant death syndrome",
            "description": "Sudden infant death syndrome (SIDS), also known as cot death or crib death, is the sudden unexplained death of a child less than one year of age. Diagnosis requires that the death remains unexplained even after a thorough autopsy and detailed death scene investigation. SIDS usually occurs during sleep. Typically death occurs between the hours of 00:00 and 09:00. There is usually no evidence of struggle and no noise produced.",
            "icon":<Baby />
        },
        "36":
        {
            "name": "Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified",
            "description": "Hyperglycemia, or high blood sugar (also spelled hyperglycaemia or hyperglycæmia) is a condition in which an excessive amount of glucose circulates in the blood plasma. This is generally a blood sugar level higher than 11.1 mmol/l (200 mg/dl), but symptoms may not start to become noticeable until even higher values such as 15–20 mmol/l (~250–300 mg/dl). A subject with a consistent range between ~5.6 and ~7 mmol/l (100–126 mg/dl) (American Diabetes Association guidelines) is considered slightly hyperglycemic, while above 7 mmol/l (126 mg/dl) is generally held to have diabetes. For diabetics, glucose levels that are considered to be too hyperglycemic can vary from person to person, mainly due to the person's renal threshold of glucose and overall glucose tolerance. On average however, chronic levels above 10-12 mmol/L (180-216 mg/dL) can produce noticeable organ damage over time.",
            "icon": <Other />
        },
        "37":
        {
            "name": "All other diseases",
            "description": "A disease is a particular abnormal condition that affects part or all of an organism not caused by external force (see 'injury') and that consists of a disorder of a structure or function, usually serving as an evolutionary disadvantage. The study of disease is called pathology, which includes the study of cause. Disease is often construed as a medical condition associated with specific symptoms and signs. It may be caused by external factors such as pathogens or by internal dysfunctions, particularly of the immune system, such as an immunodeficiency, or by a hypersensitivity, including allergies and autoimmunity.",
            "icon":<Other />
        },
        "38":
        {
            "name": "Motor vehicle accidents",
            "description": "A traffic collision, also called a motor vehicle collision (MVC) among other terms, occurs when a vehicle collides with another vehicle, pedestrian, animal, road debris, or other stationary obstruction, such as a tree, pole or building. Traffic collisions often result in injury, death, and property damage.",
            "icon":<Car />
        },
        "39":
        {
            "name": "All other and unspecified accidents and adverse effects",
            "description": "An accident, also known as an unintentional injury, is an undesirable, incidental, and unplanned event that could have been prevented had circumstances leading up to the accident been recognized, and acted upon, prior to its occurrence. Most scientists who study unintentional injury avoid using the term 'accident' and focus on factors that increase risk of severe injury and that reduce injury incidence and severity (Robertson, 2015).",
            "icon":<Accident />
        },
    }




    const mappedInfo = ways.map(way => {
      console.log('way::')
      console.log(way[0])
      console.log(cause_map[way[0]].name)
      console.log(way[1])
      console.log(cause_map[way[0]].description)
      return <BlockInfo code={way[0]} name={cause_map[way[0]].name} chance={way[1]} desc={cause_map[way[0]].description} />
    })


    // const mappedWays = this.props.death.ways.map(way => <BlockInfo name={way.name} chance={way.chance} desc={way.desc} />)
    // <span className={this.state.selected == 0 ? "icon-selected" : "icon"} onMouseEnter={() => this.onHover(0)}>{cause_map[ways[0][0]].icon}</span>


          // <span className={this.state.selected == 0 ? "icon-selected" : "icon"} onMouseEnter={() => this.onHover(0)}><Drink /></span>
          // <span className={this.state.selected == 1 ? "icon-selected" : "icon"} onMouseEnter={() => this.onHover(1)}><Accident /></span>
          // <span className={this.state.selected == 2 ? "icon-selected" : "icon"} onMouseEnter={() => this.onHover(2)}><HeartAttack /></span>

    console.log('icons')
    console.log(ways[0][0])
    console.log(cause_map[ways[0][0]])
    const icon0 = cause_map[ways[0][0]].icon;
    const icon1 = cause_map[ways[1][0]].icon;
    const icon2 = cause_map[ways[2][0]].icon;

    return (
      <li className="block">
        <div className="circle">
          <span style={{display: "inline-block", height: ".5em"}}>{age}</span><br />
          <span style={{fontSize: "12px"}}>years old</span>
        </div>

        <div className="icons">
            <span className={this.state.selected == 0 ? "icon-selected" : "icon"} onMouseEnter={() => this.onHover(0)}>{icon0}</span>
            <span className={this.state.selected == 1 ? "icon-selected" : "icon"} onMouseEnter={() => this.onHover(1)}>{icon1}</span>
            <span className={this.state.selected == 2 ? "icon-selected" : "icon"} onMouseEnter={() => this.onHover(2)}>{icon2}</span>

        </div>

        {mappedInfo[this.state.selected]}

      </li>
    )
  }
}

const BlockInfo = ({name, chance, desc}) =>
  <div>
    <h2>{name}<span> - {(chance * 100).toFixed(2)}%</span></h2>
    <p className="blockDesc">{desc}</p>
  </div>


class Blocks extends Component {
  render() {

    console.log('deaths from blocks')
    console.log(Object.entries(this.props.deaths))
    const mappedBlocks = Object.entries(this.props.deaths).map(death => <Block death={death} />)
    return (
      <ul>
        <div style={{position:"sticky", top: "200px"}}>
          <div className="teardrop"></div>
        </div>
        <div>
          {mappedBlocks}
        </div>
      </ul>
    )
  }
}


class Form extends Component {
  constructor() {
    super()
    this.state = {
      detail_age: "23",
      race: "18",
      sex: "M",
      education_2003_revision: "1",
      marital_status: "S"
    }

  }

  onChange = (event) => {
    this.state = {...this.state, [event.target.name]: event.target.value}
  }

  render() {
    return (
      <div className="form">
        <p>I am a &nbsp;
        <input name="detail_age" onChange={this.onChange} type="number" defaultValue={23}></input>
        &nbsp; year old &nbsp;
        <select name="race" onChange={this.onChange} className="minimal">
          <option value="18">Asian Indian</option>
          <option value="28">Korean</option>
          <option value="38">Samoan</option>
          <option value="48">Vietnamese</option>
          <option value="58">Guamianian</option>
          <option value="68">Other Asian / Pacific Islander</option>
          <option value="01">White</option>
          <option value="02">Black</option>
          <option value="03">American Indian</option>
          <option value="04">Chinese</option>
          <option value="05">Japanese</option>
          <option value="06">Hawaiian</option>
          <option value="07">Filipino</option>
          <option value="00">Other</option>
        </select>
        &nbsp;
        <select name="sex" onChange={this.onChange} className="minimal">
          <option value="M">Man</option>
          <option value="W">Woman</option>
        </select>
        &nbsp; with &nbsp;
        <select name="education_2003_revision" onChange={this.onChange} className="minimal">
          <option value="1">8th grade or less</option>
          <option value="2">9 - 12th grade, no diploma</option>
          <option value="3">high school graduate or GED completed</option>
          <option value="4">some college credit, but no degree</option>
          <option value="5">Associate degree</option>
          <option value="6">Bachelor’s degree</option>
          <option value="7">Master’s degree</option>
          <option value="8">Doctorate or professional degree</option>
          <option value="9">Unknown</option>
        </select>
        &nbsp; level of education, and I am &nbsp;
        <select name="marital_status" onChange={this.onChange} className="minimal">
          <option value="S">Single</option>
          <option value="M">Married</option>
          <option value="W">Widowed</option>
          <option value="D">Divorced</option>
          <option value="U">Unknown</option>
        </select>
        .
        </p>
        <input className="button" type="button" value="Kill Me" onClick={() => this.props.submit(this.state)}></input>
      </div>
    )
  }
}

const Header = () =>
  <div className="header">
    <div className='heart-rate'>
      <svg version='1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
      width='150' height='73' viewBox='0 0 150 73'>
          <polyline fill='none' stroke='#af111c' strokeWidth='3' strokeMiterlimit='10'
          points='0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486'
          />
      </svg>
      <div className='fade-in'></div>
      <div className='fade-out'></div>
    </div>
    <h1>How You Die</h1>
  </div>


const Footer = () =>
  <div className="footer">
    <p><span>Created for CX6242 at Georgia Tech by Sam Ford, John Giordano, Joe Mosby, Aaron Parry, and Rodolfo Saborio</span></p>
    <p><span><a href="https://www.github.com/samford100/cx">View the source on github</a></span></p>

  </div>
