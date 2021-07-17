import { db } from "./services/firebase";

export const firebaseConnect = (collection) => {
    const connectDB = db.collection(collection);

    return {
        getList: (cb = null) =>
            connectDB.get().then((query) => {
                const data = query.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                cb && cb(data);
            }),
        setItem: (item) => connectDB.add(item),
        deleteItem: (id) => connectDB.doc(id).delete(),
        updateItem: (id, item) => connectDB.doc(id).update(item),
        updateAll: (valueUpdate, cb = null) =>
            connectDB
                .get()
                .then((query) => {
                    const newListUpdate = [];
                    query.docs.map((doc) => {
                        newListUpdate.push(doc.ref.update(valueUpdate));
                    });
                    return Promise.all(newListUpdate);
                })
                .then(() => {
                    cb && cb();
                })
    };
};
