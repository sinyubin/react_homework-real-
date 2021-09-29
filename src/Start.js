import { firestore } from "../../firebase";
import { loadNemos } from "./redux/modules/Nemo";

const nemos_db = firestore.collection("nemos");

// 액션
const LOAD = "nemos/LOAD";
const LOAD_MORE = "nemos/LOAD_MORE";
const ADD = "nemo/ADD";
const MODIFY = "nemo/MODIFY";
const COMPLETE = "nemo/COMPLETE";
const DELETE = " nemo/DELETE";

// 초기값
const initialState = {
  nemo_list: [],
  lastValue: 0,
};

// 액션함수
export const loadNemods = (nemos, lastValue) => ({
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
export const deleteNemo = (id) => ({ type: DELETE, id });

// thunk

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

// firebase에서 다음 단어들을 불러오는 함수
export const loadMoreNemosFB = (value) => {
  return function (dispatch) {
    let nemos = [];
    let beforeNum = parseInt(value);
    let lastValue;
    nemos_db
      .orderBy("date", "desc")
      .startAfter(beforeNum)
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

// 새로운 단어 등록 함수
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

// 암기/미암기 토글 함수
export const updateCompleteFB = (nemo) => {
  return function (dispatch) {
    nemos_db.doc(nemo.id).update({ completed: !nemo.completed });
    dispatch(updateComplete(nemo.id));
  };
};

// 단어 내용 변경 함수
export const modifyNemoFB = (nemo, id) => {
  return function (dispatch) {
    nemos_db.doc(id).update(nemo);
    const new_nemo = { ...nemo, id };
    dispatch(modifyNemo(new_nemo));
  };
};

// 단어 삭제 함수
export const deleteNemoFB = (id) => {
  return function (dispatch) {
    nemos_db.doc(id).delete();
    dispatch(deleteNemo(id));
  };
};

// 리듀서
function nemo(state = initialState, action) {
  switch (action.type) {
    case "nemos/LOAD":
      return {
        ...state,
        nemo_list: action.nemos,
        lastValue: action.lastValue,
      };
    case "nemos/LOAD_MORE":
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
        nemo.id === action.id ? { ...nemo, completed: !nemo.completed } : nemo
      );
      return {
        ...state,
        nemo_list: new_nemo_list,
      };
    case "nemo/MODIFY":
      let modified_nemos = state.word_list.map((nemo) =>
        nemo.id === action.word.id ? { ...nemo, ...action.word } : nemo
      );
      return {
        ...state,
        nemo_list: modified_nemos,
      };
    case "word/DELETE":
      let left_nemos = state.nemo_list.filter((nemo) => nemo.id !== action.id);
      return {
        ...state,
        nemo_list: left_nemos,
      };
    default:
      return state;
  }
}

export default nemo;
