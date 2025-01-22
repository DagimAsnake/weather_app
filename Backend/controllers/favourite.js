import User from '../models/User.js';
import Favourite from '../models/Favourite.js';

export const addToFavourites = async (req, res) => {
  const { city, country } = req.body;
  const userId = req.userAuthId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let favourite = await Favourite.findOne({ city, country });
    if (!favourite) {
      favourite = new Favourite({ city, country, user: userId });
      await favourite.save();
    }

    if (!user.favourites.some((favId) => favId.equals(favourite._id))) {
      user.favourites.push(favourite._id);
      await user.save();
    }

    const populatedUser = await User.findById(userId).populate('favourites');

    res
      .status(200)
      .json({
        message: 'Favourite add successfully',
        favourites: populatedUser.favourites,
      });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to add city to favourites',
      error: err.message,
    });
  }
};

export const getFavourites = async (req, res) => {
  const userId = req.userAuthId;

  try {
    const user = await User.findById(userId).populate('favourites');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const populatedUser = await User.findById(userId).populate('favourites');

    res.status(200).json({
      message: 'Favourite fetched successfully',
      favourites: populatedUser.favourites,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to fetch favourites', error: err.message });
  }
};

export const removeFavourites = async (req, res) => {
  const { city, country } = req.body;
  const userId = req.userAuthId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const favourite = await Favourite.findOne({ city, country });
    if (!favourite) {
      return res.status(404).json({ message: 'Favourite city not found' });
    }

    const favouriteIndex = user.favourites.findIndex((favId) =>
      favId.equals(favourite._id)
    );

    if (favouriteIndex === -1) {
      return res.status(400).json({ message: 'City is not in favourites' });
    }

    user.favourites.splice(favouriteIndex, 1);
    await user.save();

    const populatedUser = await User.findById(userId).populate('favourites');

    res.status(200).json({
      message: 'Favourite removed successfully',
      favourites: populatedUser.favourites,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to remove city from favourites',
      error: err.message,
    });
  }
};
