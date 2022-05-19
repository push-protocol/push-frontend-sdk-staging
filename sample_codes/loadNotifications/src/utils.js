
// utility function to fake promises
export const fakePromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    resolve('foo');
    }, 4000);
  });
}
  
export const addSecretNotifications = (notifications) => {
    // decrease the ratio for lesser probability
    const getRandomBool = () =>  Math.random() < 0.3;

    return notifications.map((oneNotification, i) => {
        const notification = {
          title: `secret title for ${i} shhh...`,
          body: `secret body for ${i} shhh...`
        }
        
        if (getRandomBool()) {
          return {
            ...oneNotification,
            title: '',
            message: '',
            notification,
            secret: "kshfksjhdfkhsdkfhskfksdhkfsdkjfhsfksdfhk"
          };
        }
        
        return oneNotification;
    })


}