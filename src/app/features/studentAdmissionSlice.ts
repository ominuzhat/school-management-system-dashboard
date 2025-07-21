import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Fee {
  name: string;
  amount: number;
  one_time: boolean;
  effective_from?: string;
}

interface StudentState {
  student: {
    first_name: string;
    last_name: string;
    mother_name: string;
    father_name: string;
    mother_profession: string;
    father_profession: string;
    mother_phone_number: string;
    phone_number: string;
    father_number: string;
    date_of_birth: string;
    local_guardian_name: string;
    local_guardian_phone_number: string;
    local_guardian_relation: string;
    gender: string;
    religion: string;
    present_address: string;
    permanent_address: string;
    is_active: boolean;
    email: string;
    image: File[];
    [key: string]: any;
    
  };
  admission: {
    optional_subject: string;
    session: string;
    grade_level: string;
    group_type: any; 
    roll: string;
    section: string;
    shift: string;
    status: string;
    subjects: number[];
    [key: string]: any;
  };
  fee: {
    fee_type: string;
    discount_type: string;
    discount_value: number;
    fees: Fee[];
    [key: string]: any;
  };
}

const initialState: StudentState = {
  student: {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    mother_name: "",
    father_name: "",
    gender: "M",
    mother_profession: "",
    father_profession: "",
    father_designation: "",
    mother_phone_number: "",
    father_number: "",
    local_guardian_name: "",
    local_guardian_phone_number: "",
    local_guardian_relation: "",
    religion: "Islam",
    present_address: "",
    permanent_address: "",
    is_active: false,
    image: [],
  },
  admission: {
    optional_subject: "",
    session: "",
    grade_level: "",
    roll: "",
    section: "",
    shift: "",
    group_type: "general",
    status: "approved",
    subjects: [],
  },
  fee: {
    fee_type: "class",
    discount_type: "percent",
    discount_value: 0,
    fees: [],
  },
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    updateStudentField: (
      state,
      action: PayloadAction<{
        field: keyof StudentState["student"];
        value: any;
      }>
    ) => {
      state.student[action.payload.field] = action.payload.value;
    },
    updateAdmissionField: (
      state,
      action: PayloadAction<{
        field: keyof StudentState["admission"];
        value: any;
      }>
    ) => {
      state.admission[action.payload.field] = action.payload.value;
    },
    updateFeeField: (
      state,
      action: PayloadAction<{
        field: keyof StudentState["fee"];
        value: any;
      }>
    ) => {
      state.fee[action.payload.field] = action.payload.value;
    },

    addFee: (state, action: PayloadAction<Fee>) => {
      state.admission.fees.push(action.payload);
    },
    setSubjects: (state, action: PayloadAction<number[]>) => {
      state.admission.subjects = action.payload;
    },
    resetStudent: () => initialState,
  },
});

export const {
  updateStudentField,
  updateAdmissionField,
  addFee,
  setSubjects,
  resetStudent,
  updateFeeField,
} = studentSlice.actions;

export default studentSlice.reducer;
