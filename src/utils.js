import { db } from "./services/firebase";

export const firebaseConnect = (collection) => {
    const connectDB = db.collection(collection);

    return {
        getList: (cb = null) =>
            connectDB.get().then((query) => {
                const data = query.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                cb && cb(data);
            }),
        setItem: (item, cb = null) =>
            connectDB.add(item).then(() => {
                cb && cb();
            }),
        deleteItem: (id, cb = null) =>
            connectDB
                .doc(id)
                .delete()
                .then(() => {
                    cb && cb();
                }),
        updateItem: (id, item, cb = null) =>
            connectDB
                .doc(id)
                .update(item)
                .then(() => {
                    cb && cb();
                }),
        updateAll: (item, cb = null) =>
            connectDB
                .get()
                .then((query) => {
                    const newListUpdate = [];
                    query.docs.map((doc) => {
                        newListUpdate.push(doc.ref.update(item));
                    });
                    return Promise.all(newListUpdate);
                })
                .then(() => {
                    cb && cb();
                })
    };
};
