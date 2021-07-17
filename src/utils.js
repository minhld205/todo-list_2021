import firebase from "firebase";
import { db } from "./services/firebase";

const t = firebase.firestore.Timestamp.fromDate(new Date());
const d = t.toDate();

export const firebaseConnect = (collection) => {
    const connectDB = db.collection(collection);

    return {
        getList: (cb = null) =>
            connectDB
                .orderBy("timestamp", "desc")
                .get()
                .then((query) => {
                    const data = query.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id
                    }));
                    cb && cb(data);
                }),
        setItem: (item, cb = null) =>
            connectDB.add({ ...item, timestamp: d }).then(() => {
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
                }),
        updateList: (list = [], cb = null) =>
            connectDB
                .get()
                .then((query) => {
                    const newListUpdate = [];
                    query.docs.map((doc) => {
                        list.map((item) => {
                            if (doc.id === item.id) {
                                newListUpdate.push(doc.ref.update(item));
                            }
                        });
                    });
                    return Promise.all(newListUpdate);
                })
                .then(() => {
                    cb && cb();
                })
    };
};
