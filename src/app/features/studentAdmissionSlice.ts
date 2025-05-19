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
    mother_email: string;
    father_email: string;
    mother_profession: string;
    mother_designation: string;
    mother_education_qualification: string;
    father_profession: string;
    father_designation: string;
    father_education_qualification: string;
    mother_phone_number: string;
    phone_number: string;
    father_number: string;
    date_of_birth: string;
    local_guardian_name: string;
    local_guardian_email: string;
    local_guardian_phone_number: string;
    local_guardian_relation: string;
    gender: string;
    religion: string;
    nationality: string;
    present_address: string;
    permanent_address: string;
    is_active: boolean;
    email: string;
    image: File[];
    [key: string]: any;
  };
  admission: {
    session: string;
    grade_level: string;
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
    subjects: number[];
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
    gender: "",
    mother_email: "",
    father_email: "",
    mother_profession: "",
    mother_designation: "",
    mother_education_qualification: "",
    father_profession: "",
    father_designation: "",
    father_education_qualification: "",
    mother_phone_number: "",
    father_number: "",
    local_guardian_name: "",
    local_guardian_email: "",
    local_guardian_phone_number: "",
    local_guardian_relation: "",
    religion: "",
    nationality: "",
    present_address: "",
    permanent_address: "",
    is_active: false,
    image: [],
  },
  admission: {
    session: "",
    grade_level: "",
    roll: "",
    section: "",
    shift: "",
    status: "",
    subjects: [],
  },
  fee: {
    fee_type: "custom",
    discount_type: "percent",
    discount_value: 0,
    fees: [],
    subjects: [],
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
} = studentSlice.actions;

export default studentSlice.reducer;
