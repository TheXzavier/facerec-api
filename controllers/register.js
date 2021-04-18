const handleRegister = (req, res, db)=>{
    const {email, name, password} = req.body;
    const wrongEmailCheck = email;
    const CheckAt = '@';
    if(!email || !name || !password || !wrongEmailCheck.includes(CheckAt)){
       return res.status(400).json('incorrect info')
   }
       db.transaction(trx => {
       trx.insert({
         hash : password,
         email:email
})
.into('login')
.returning('email')
.then(loginEmail =>{
    return trx('users')
    .returning('*')
    .insert({
     email: loginEmail[0],
     name:  name,
     joined:new Date()
})
.then(user => {
    res.json( [user[0],{success: true}])
 })
})
.then(trx.commit)
.catch(trx.rollback)

}
)
.catch(err => res.status(400).json('sorry cannot register'))
}


module.exports = {
    handleRegister : handleRegister
}