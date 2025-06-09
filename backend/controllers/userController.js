const UserModel = require('../models/userModel');

// ดึงผู้ใช้ทั้งหมด
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await UserModel.getAllUsers(); // เราจะเขียนใน model
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ดึงผู้ใช้โดย id
exports.getUserById = async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};