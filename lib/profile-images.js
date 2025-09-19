// Profile image utility for dynamic avatar assignment
// Based on gender detection from names

// Male profile images
export const maleImages = [
  '/man1.jpeg',
  '/man2.jpeg', 
  '/man3.jpg',
  '/man4.jpg',
  '/professional-man.png',
  '/professional-engineer.png',
  '/professional-data-scientist.png'
];

// Female profile images  
export const femaleImages = [
  '/women1.jpeg',
  '/women1.jpg',
  '/professional-woman-designer.png',
  '/professional-woman-developer.png',
  '/professional-woman-diverse.png'
];

// All images combined
export const allImages = [...maleImages, ...femaleImages];

// Common male names for gender detection
const maleNames = [
  'alex', 'alexander', 'andrew', 'anthony', 'benjamin', 'brandon', 'brian', 'charles', 'christopher', 'daniel', 'david', 'edward', 'eric', 'james', 'jason', 'jeffrey', 'john', 'jonathan', 'joseph', 'joshua', 'justin', 'kevin', 'michael', 'nicholas', 'patrick', 'paul', 'richard', 'robert', 'ryan', 'samuel', 'stephen', 'thomas', 'timothy', 'william', 'aaron', 'adam', 'albert', 'arthur', 'bradley', 'carl', 'carlos', 'christian', 'cody', 'craig', 'curtis', 'dennis', 'donald', 'douglas', 'eugene', 'frank', 'gary', 'gregory', 'harold', 'henry', 'howard', 'jack', 'jacob', 'jeremy', 'jesse', 'joe', 'jordan', 'kenneth', 'larry', 'lawrence', 'mark', 'martin', 'matthew', 'nathan', 'peter', 'philip', 'raymond', 'roger', 'ronald', 'scott', 'sean', 'terry', 'tyler', 'victor', 'wayne', 'zachary'
];

// Common female names for gender detection
const femaleNames = [
  'alexis', 'amanda', 'amy', 'andrea', 'angela', 'anna', 'anne', 'ashley', 'barbara', 'betty', 'brenda', 'carol', 'carolyn', 'catherine', 'christine', 'cynthia', 'deborah', 'donna', 'dorothy', 'elizabeth', 'emily', 'evelyn', 'frances', 'gloria', 'helen', 'jacqueline', 'jane', 'janet', 'jennifer', 'jessica', 'joyce', 'judith', 'julia', 'karen', 'kathleen', 'kelly', 'kimberly', 'laura', 'linda', 'lisa', 'margaret', 'maria', 'marie', 'mary', 'michelle', 'nancy', 'patricia', 'pamela', 'rebecca', 'ruth', 'sandra', 'sarah', 'sharon', 'shirley', 'susan', 'tammy', 'teresa', 'virginia', 'wendy', 'alice', 'alison', 'amanda', 'amber', 'anita', 'ann', 'audrey', 'beth', 'beverly', 'bonnie', 'carla', 'carmen', 'carolyn', 'cathy', 'cheryl', 'connie', 'diana', 'diane', 'donna', 'doris', 'edith', 'elaine', 'ellen', 'florence', 'gloria', 'grace', 'heather', 'janice', 'jean', 'joan', 'judy', 'julie', 'katherine', 'kathy', 'kelly', 'kim', 'laura', 'lauren', 'leslie', 'linda', 'lisa', 'lois', 'lori', 'louise', 'lynn', 'margaret', 'martha', 'mary', 'melissa', 'michelle', 'nancy', 'nicole', 'norma', 'pamela', 'patricia', 'paula', 'phyllis', 'rachel', 'rebecca', 'robin', 'rose', 'ruby', 'sandra', 'sara', 'sharon', 'stephanie', 'susan', 'tammy', 'teresa', 'tina', 'tonya', 'tracy', 'valerie', 'vanessa', 'virginia', 'wanda'
];

/**
 * Detects gender from a person's name
 * @param {string} name - The person's full name
 * @returns {string} - 'male', 'female', or 'unknown'
 */
export function detectGender(name) {
  if (!name || typeof name !== 'string') return 'unknown';
  
  const firstName = name.toLowerCase().split(' ')[0];
  
  if (maleNames.includes(firstName)) return 'male';
  if (femaleNames.includes(firstName)) return 'female';
  
  return 'unknown';
}

/**
 * Gets a random profile image based on gender
 * @param {string} name - The person's full name
 * @returns {string} - Path to the profile image
 */
export function getProfileImage(name) {
  const gender = detectGender(name);
  
  switch (gender) {
    case 'male':
      return maleImages[Math.floor(Math.random() * maleImages.length)];
    case 'female':
      return femaleImages[Math.floor(Math.random() * femaleImages.length)];
    default:
      return allImages[Math.floor(Math.random() * allImages.length)];
  }
}

/**
 * Gets a consistent profile image for a user (same image every time)
 * @param {string} name - The person's full name
 * @param {number} seed - Optional seed for consistent results
 * @returns {string} - Path to the profile image
 */
export function getConsistentProfileImage(name, seed = null) {
  const gender = detectGender(name);
  let imageArray;
  
  switch (gender) {
    case 'male':
      imageArray = maleImages;
      break;
    case 'female':
      imageArray = femaleImages;
      break;
    default:
      imageArray = allImages;
  }
  
  // Use name as seed for consistent results
  const nameSeed = seed || name.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const index = Math.abs(nameSeed) % imageArray.length;
  return imageArray[index];
}

/**
 * Avatar component props for consistent styling
 */
export const avatarProps = {
  className: "w-16 h-16 rounded-full object-cover shadow-md hover:shadow-lg transition-shadow duration-200",
  style: {
    objectFit: 'cover'
  }
};

/**
 * Small avatar component props
 */
export const smallAvatarProps = {
  className: "w-8 h-8 rounded-full object-cover shadow-sm hover:shadow-md transition-shadow duration-200",
  style: {
    objectFit: 'cover'
  }
};

/**
 * Large avatar component props
 */
export const largeAvatarProps = {
  className: "w-20 h-20 rounded-full object-cover shadow-lg hover:shadow-xl transition-shadow duration-200",
  style: {
    objectFit: 'cover'
  }
};
