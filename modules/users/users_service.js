const UsersSchema = require("./users");

const login = (username, password) => {
  return new Promise(async (resolve, reject) => {
    let user = await UsersSchema.findOne({ username });
    if (!user) {
      reject("The username is not available");
    }

    const isMatchPassword = user.matchesPassword(password);
    if (!isMatchPassword) {
      reject("The username or password is invalid.");
    }

    // Update last login and make sure the exist user
    user = await UsersSchema.findOneAndUpdate(
      { _id: user._id },
      {
        isActive: true,
        lastLogin: new Date(),
      }
    );
    resolve(user);
  });
};

const logout = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await UsersSchema.findOneAndUpdate(
        { _id },
        {
          isActive: false,
        }
      );
      resolve(user);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const register = (body) => {
  return new Promise(async (resolve, reject) => {
    const user = await UsersSchema.findOne({ username: body.email });
    if (user) {
      reject("The username is available. Try again?");
    } else {
      try {
        const userModel = {
          ...body,
          isActive: true,
          lastLogin: new Date(),
        };
        const newUser = await new UsersSchema({ ...userModel }).save();
        resolve(newUser);
      } catch (error) {
        reject(error);
      }
    }
  });
};

module.exports = {
  login,
  register,
  logout,
};
