const { BookModel, UserModel } = require('../models/index');

exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find();
    if (!users.length) {
        return res.status(500).json({
            success: false,
            message: "There are no users"
        })
    }

    res.status(200).json({
        success: true,
        message: "Fetched users successfully",
        data: users
    })
}

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    const user = await UserModel.findById({ id });
    if (!user) {
        return res.status(500).json({
            success: false,
            message: "User not Found!"
        })
    }

    res.status(200).json({
        success: false,
        message: `Fetched ${user.name} successfully`,
        data: user
    })
};

exports.createUser = async (req, res) => {
    const newUser = req.body;
    if (!newUser.name || !newUser.surname || !newUser.email || newUser.subscriptionType || newUser.subscriptionDate) {
        return res.status(500).json({
            success: false,
            message: "Please provide complete information"
        })
    }
    const user = await UserModel.find({ email: newUser.email });
    if (user) {
        return res.status(500).json({
            success: false,
            message: "User with this email already exists",
        })
    }

    const users = [...UserModel, newUser];
    res.status(200).json({
        success: true,
        message: "User created successfully!",
        data: newUser
    })

}
exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const update = req.body;
    const user = UserModel.find({ id })
    
    if (!user)
    {
        return res.status(500).json({
            success: false,
            message: "User not found!!"
        })
    }

    const updatedUser = UserModel.findOneAndUpdate({ ...update, new: true })
    res.status(200).json({
        success: true,
        message: "User Updated successfully.",
        data: updatedUser
    })
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = UserModel.find({ id });

    if (!user) {
        return res.status(500).json({
            success: false,
            message: "This User does not exist."
        })
    }

    UserModel.deleteOne({ id });
    res.status(200).json({
        success: true,
        message: "User has beed deleted successfully."
    })
};

exports.getSubscriptionDetailsById = async (req, res) => {
    const { id } = req.params;
    const user = UserModel.findOne({ id });

    if (!user) {
        return res.status(500).json({
            success: false,
            message: "No such user found",
        })
    }

    /*
    * subcription details:
      - subscriptionDate,
      - subscriptionType,
      - subscriptionEndDate,
      - daysOverdue,
      - Fine
    */
    const dateInDays = (data = "") => { 
        const date = '';
        const days = 0
        if (data) {
          date = new Date(data);
        } else {
          date = new Date();
        }

        days = Math.floor(date / 1000 * 60 * 60 * 24);
        return days;
    }

    const subscriptionEndDate = (subscriptionType) => {
        const endDate = dateInDays(user.subscriptionDate);
        switch (subscriptionType) {
            case "Basic":
                endDate += 30;
                break;
            case "Standard":
                endDate += 180;
                break;
            case "Premium":
                endDate += 356;
                break;
            default:
                return null
        }
        return endDate; 
    }

    const subscriptionEnd = subscriptionEndDate(user.subscriptionType);
    const daysOverdue = dateInDays() - dateInDays(subscriptionEnd)

    const userSubDetail = {
        ...user,
        subscriptionEnd: subscriptionEnd,
        daysOverdue: dateInDays,
        fine: daysOverdue > 0 ? 100 : 0
    }

    res.status(200).json({
        success: true,
        message: "Fetched user subscription details successfull!",
        data: userSubDetail
    })
}