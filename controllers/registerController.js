const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
       
        //create and store the new user ()
        const result = await User.create({ 
                "username": user,
                "password": hashedPwd 
            });
        
            console.log(result);
            
            //second method to create user
           /*  const newUser = new User({
                "username": user,
                "password": hashedPwd 
            }) */

            //another method for creation user/record by setting values like this
           /*  const newUser = new User();
            newUser.username = "dd";
            const result = await newUser.save()
 */
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };