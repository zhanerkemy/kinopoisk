const User = require('../auth/User');
const bcrypt = require('bcrypt');

async function createAdmin() {
    try {
        // Поиск администратора
        const findAdmin = await User.findOne({ isAdmin: true });
        
        if (!findAdmin) { // Если администратора нет
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;

                bcrypt.hash('1', salt, async function(err, hash) {
                    if (err) throw err;

                    const newAdmin = new User({
                        full_name: 'Master',
                        email: 'master@mail.ru',
                        isAdmin: true,
                        password: hash
                    });

                    await newAdmin.save();
                    console.log('Admin account created');
                });
            });
        } else {
            console.log('Admin already exists');
        }
    } catch (error) {
        console.error('Error creating admin:', error);
    }
}

module.exports = createAdmin;