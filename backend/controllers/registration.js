const con = require("./../connections/connection");

const saveData = (req, res) => {
    const data = req.body;
    con.query("INSERT INTO register SET ?", data, (err, data) => {
        if (err) {
            return res
                .status(500)
                .json({ error: "Error inserting data into the database." });
        }
        return res.status(200).json({ message: "Data inserted successfully." });
    });
};

const getUsersData = (req, res) => {
    con.query("select * from register", (err, data) => {
        if (data) {
            return res.status(200).json(data);
        }
    });
};

const getUser = (req, res) => {
    const id = req.params.id;
    con.query(`select * from register where id = ${id}`, (err, data) => {
        if (data) {
            return res.status(200).json(data);
        } else {
            console.log(err);
        }
    });
};

const updateData = (req, res) => {
    const id = req.params.id;
    let {
        first_name,
        last_name,
        gender,
        phone_number,
        email,
        designation,
        dob_date,
        age,
        photo,
        country,
        state,
        city,
        pincode,
    } = req.body;
    const qry = `UPDATE register SET first_name=?, last_name=?, gender=?, phone_number=?, email=?, designation=?,dob_date=?,age=?,photo=?,country=?,state=?, city=?, pincode=? WHERE id=?`;
    con.query(qry, [first_name,
        last_name,
        gender,
        phone_number,
        email,
        designation,
        dob_date,
        age,
        photo,
        country,
        state,
        city,
        pincode,id], (err,data)=>{
            if(err) throw err
            if(data){
                res.status(201).json(data)
            }
        });
};

module.exports = { saveData, getUsersData, getUser, updateData };
