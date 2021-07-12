export const urls = {
    createPurchase: (purchaseId, clientId) => `/api/savePurchase/${purchaseId}/${clientId}`,
    findUserById: (clientId) => `/api/findClient/${clientId}`,
    createUser: (clientId, clientName, clientAddress, clientEmailAddress, clientTelephone, rol) => `/api/saveClient/${clientId}/${clientName}/${clientAddress}/${clientEmailAddress}/${clientTelephone}/${rol}`,
    createProducts: (productId, brand, productPrice, productName, purchaseId) => `/api/saveProduct/${productId}/${brand}/${productPrice}/${productName}/${purchaseId}`,
    showProducts: (purchaseId) => `/api/showProducts/${purchaseId}`,
    findPurchaseById: (purchaseId) => `/api/findPurchase/${purchaseId}`,
    findProductsById: (productId) => `/api/findProductById/${productId}`,
    paymentPurchase: (purchaseId) => `/api/deletePurchase/${purchaseId}`,
    findProducts: `api/findProduct`,
    findPurchase: `api/findPurchase`,
    findUser: `/api/findClient`
}