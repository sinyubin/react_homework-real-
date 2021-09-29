import { doc } from "@firebase/firestore";
import { firestore } from "../../firebase";

const nemos_db = firestore.colllection("nemos");

//액션
const LOAD = "nemos/LOAD";
const LOAD_MORE = "nemos/LOAD_MORE";
const ADD = "nemo/ADD";
const MODIFY = "nemo/MODIFY";
const COMPLETE = "nemo/COMPLETE";
const DELETE = "nemo/DELETE";

const initialState = { nemo_list: [], lastValue: 0 };

//액션함수
export const loadNemos = (nemos, lastValue) => ({
  type: LOAD,
  nemos,
  lastValue,
});

export const loadMoreNemos = (nemos, lastValue) => ({
  type: LOAD_MORE,
  nemos,
  lastValue,
});

export const addNemo = (nemo) => ({ type: ADD, nemo });
export const updateComplete = (id) => ({ type: COMPLETE, id });
export const modifyNemo = (nemo) => ({ type: MODIFY, nemo });
export const deleteWord = (id) => ({ type: DELETE, id });

//thunk

export const loadNemosFB = () => {
  return function (dispatch) {
    let nemos = [];
    let lastValue;
    nemos_db
      .orderBy("date", "desc")
      .limit(10)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          nemos = [...nemos, { id: doc.id, ...doc.data() }];
          lastValue = doc.data().date;
        });
      })
      .then((res) => dispatch(loadNemos(nemos, lastValue)));
  };
};

export const loadMoreNemosFB = (value) => {
  return function (dispatch) {
    let nemos = [];
    let beforeNum = parseInt(value); 
    let lastValue;
    nemos_db
      .orderBy("date", "desc")
      .startAfter(beforeNum) /
      .limit(10)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          if (doc.exists) {
            nemos = [...nemos, { id: doc.id, ...doc.data() }];
            lastValue = doc.data().date;
          }
        });
      })
      .then((res) => dispatch(loadMoreNemos(nemos, lastValue)));
  };
};

export const addNemoFB = (nemo) => {
  return function (dispatch) {
    let new_nemo;
    nemos_db
      .add(nemo)
      .then((doc) => {
        new_nemo = { ...nemo, id: doc.id };
      })
      .then((res) => dispatch(addNemo(new_nemo)));
  };
};

export const updateCompleteFB = (nemo) => {
  return function (dispatch) {
    nemos_db.doc(nemo.id).update({ completed: !nemo.completed });
    dispatch(updateComplete(nemo.id));
  };
};

export const modifyWordFB = (nemo, id) => {
  return function (dispatch) {
    nemos_db.doc(id).update(nemo);
    const new_nemo = { ...nemo, id };
    dispatch(modifyNemo(new_nemo));
  };
};

export const deleteWordFB = (id) => {
  return function (dispatch) {
    nemos_db.doc(id).delete();
    dispatch(deleteWord(id));
  };
};

//리듀서
function nemos(state = initialState, action) {
  switch (action.type) {
    case "nemo/LOAD":
      return {
        ...state,
        nemo_list: action.nemo,
        lastValue: action.lastValue,
      };
    case "nemo/LOAD_MORE":
      return {
        ...state,
        nemo_list: [...state.nemo_list, ...action.nemos],
        lastValue: action.lastValue,
      };
    case "nemo/ADD":
      let added_nemos = [...state.nemo_list, action.nemo];
      return {
        ...state,
        nemo_list: added_nemos,
      };
    case "nemo/COMPLETE":
      const new_nemo_list = state.nemo_list.map((nemo) =>
        nemo.id === action.nemo.id
          ? { ...nemo, completed: !nemo.completed }
          : nemo
      );
      return {
        ...state,
        nemo_list: new_nemo_list,
      };
    case "nemo/MODIFY":
      let moified_nemos = state.nemo_list.map((nemo) =>
        nemo.id === action.nemo.id ? { ...nemo, ...action.nemo } : nemo
      );
      return {
        ...state,
        nemo_list: moified_nemos,
      };
    case "nwmo/DELETE":
      let left_nemo = state.nemo_list.filter((nemo) => nemo.id !== action.id);
      return {
        ...state,
        nemo_list: left_nemo,
      };
    default:
      return state;
  }
}

export default Nemo;
