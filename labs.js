let pt_age;
let pt_sex;
let pcm_labs;
let req_labs = [];
const pcm = document.getElementById('pcm');
const age = document.getElementById('age');
const sex = document.getElementById('gender');
const output = document.getElementById('output');

const dataArrays = {
    aa: ["A1c", "Lipid Panel", "CMP", "CBC", "TSH"],
    ab: ["A1c", "Lipid Panel"],
    ac: ["A1c", "Lipid Panel"],
    ad: ["A1c", "Lipid Panel"],
    ae: ["A1c", "Lipid Panel", "CMP", "CBC", "TSH"],
    af: ["A1c", "Lipid Panel", "CMP", "CBC", "TSH"],
    ag: ["A1c", "Lipid Panel"],
    ah: ["A1c", "Lipid Panel"],
    ai: ["A1c", "Lipid Panel"],
    aj: ["A1c", "Lipid Panel", "CMP", "CBC", "TSH"],
    ak: ["A1c", "Lipid Panel", "CMP", "CBC", "TSH"],
    al: ["A1c", "Lipid Panel"],
    am: ["A1c", "Lipid Panel", "CMP", "CBC", "TSH"],
    an: ["A1c", "Lipid Panel", "BMP"],
    ao: ["A1c", "Lipid Panel", "BMP"]
};
pcm.addEventListener('change', function () {
    const pcm_value = this.value;
    if (pcm_value && dataArrays[pcm_value]) {
        pcm_labs = dataArrays[pcm_value]
    }
});
age.addEventListener('change', function () {
    pt_age = this.value;
});
sex.addEventListener('change', function () {
    pt_sex = this.value;
});
function performSearch() {
    const htn = ["acebutolol", "atenolol", "betaxolol", "bisoprolol", "carvedilol", "labetalol", "metoprolol", "nadolol", "nebivolol", "penbutolol", "pindolol", "propranolol"];
    const gout = ["colchicine", "allupurinol"];
    const osteoporosis = ["prolia", "bisphosphate"];
    const diabetes = ["trulicity", "metformin", "insulin", "jardiance", "januvia"];
    const testicular = ["androgel", "depotestosterone"];

    const input = document.getElementById('medication-list').value.toLowerCase().trim();

    if (!input) { }

    const inputWords = input.split(/\s+/);
    const on_htn_meds = inputWords.some(word => htn.includes(word.toLowerCase()));
    const on_gout_meds = inputWords.some(word => gout.includes(word.toLowerCase()));
    const on_osteoporosis_meds = inputWords.some(word => osteoporosis.includes(word.toLowerCase()));
    const on_diabetes_meds = inputWords.some(word => diabetes.includes(word.toLowerCase()));
    const on_testicular_meds = inputWords.some(word => testicular.includes(word.toLowerCase()));

    req_labs = req_labs.concat(pcm_labs);
    console.log(pcm_labs);

    if (pt_age >= 35) {
        if (pt_age > 54 && pt_sex == "Male") {
        req_labs.push("PSA");
    }
    if (on_htn_meds) {
        req_labs.push("BMP", "Lipid Panel");
    }
    if (on_gout_meds) {
        req_labs.push("Uric Acid");
    }
    if (on_osteoporosis_meds) {
        req_labs.push("25-Hydroxyvitamin D", "Calcium");
    }
    if (on_diabetes_meds) {
        req_labs.push("A1c", "Microalbumin Panel", "CBC", "BMP", "Lipid Panel");
    }
    if (on_testicular_meds) {
        req_labs.push("Testosterone", "LFT", "Lipid Panel", "PSA", "H&H");
    }
    }
    else {
        req_labs.push("Patient is not required to complete any Annual Labs until the age of 35; unless provider advised otherwise.")
    }
    

    const unique_array = [...new Set(req_labs)];
    let filtered_array = unique_array.filter(function (e) { return e; });
    output.innerHTML = `${filtered_array.join(', ')}`;
    
    console.log("Age: ", pt_age);
    console.log("Gender: ", pt_sex);
    console.log(filtered_array);
}