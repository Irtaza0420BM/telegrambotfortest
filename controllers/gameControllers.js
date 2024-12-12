// const {User} = require("../models/gameUserModel")

// exports.saveData = async (req, res) => {
//     const { userId, username, dateRegistered } = req.body;
//     console.log(req.body)
//     try {
//       let user = await User.findOne({ _id: userId });
//       if (!user) {
//         const creating_user = {
//           _id: userId, // Use userId as the document ID
//           name: username,
//           dateRegistered: dateRegistered,
//           clickCount: 0,
//         };
//         user = await User.create(creating_user); // Create and assign the user
//       }
//       console.log(user)
//       res.status(200).json({ data: user });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: "Unable to connect to database. /Database is down.." });
//     }
//   }

// exports.fetchData = async (req, res) => {
//     const { userId, clickCount } = req.body;
  
//     if (!userId || typeof clickCount !== 'number') {
//       return res.status(400).json({ success: false, message: "Invalid input data." });
//     }
  
//     try {
//       const filter = { _id: userId }; // Filter by userId
//       const update = {
//         $set: { clickCount: clickCount }, // Update the clickCount field
//       };
  
//       const result = await User.updateOne(filter, update);
//       console.log("Update Result:", result);
  
//       if (result.matchedCount === 0) {
//         return res.status(404).json({
//           success: false,
//           message: "User not found in the database. Contact admin.",
//         });
//       }
  
//       res.status(200).json({
//         success: true,
//         message: "User data updated successfully.",
//       });
//     } catch (error) {
//       console.error("Error in /savedata endpoint:", error);
//       res.status(500).json({
//         success: false,
//         message: "An error occurred while saving data. Please try again.",
//       });
//     }
//   }