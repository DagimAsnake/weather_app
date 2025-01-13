export const getTokenFromHeader = (req) => {
  try {
    const authorization = req?.headers?.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Error('Authorization header is missing or invalid');
    }
    return authorization.split(' ')[1];
  } catch (error) {
    console.error('Error extracting token:', error.message);
    throw new Error('Failed to extract token from header');
  }
};
