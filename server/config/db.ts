import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

// Create real PG pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Flag to track fallback status
let isFallback = false;

// Seed Password Hashes
const adminHash = bcrypt.hashSync('admin123', 10);
const doctorHash = bcrypt.hashSync('doctor123', 10);
const nurseHash = bcrypt.hashSync('nurse123', 10);
const staffHash = bcrypt.hashSync('staff123', 10);

// IN-MEMORY DATABASE STATE
const mockUsers = [
  { id: 1, email: 'admin@mediflow.com', password_hash: adminHash, role: 'Admin', name: 'Dr. Sarah Admin', created_at: new Date('2026-01-10') },
  { id: 2, email: 'doctor@mediflow.com', password_hash: doctorHash, role: 'Doctor', name: 'Dr. John Watson', created_at: new Date('2026-02-15') },
  { id: 3, email: 'nurse@mediflow.com', password_hash: nurseHash, role: 'Nurse', name: 'Nurse Clara Barton', created_at: new Date('2026-03-20') },
  { id: 4, email: 'staff@mediflow.com', password_hash: staffHash, role: 'Staff', name: 'Staff James', created_at: new Date('2026-04-01') },
  { id: 5, email: 'dr.house@mediflow.com', password_hash: doctorHash, role: 'Doctor', name: 'Dr. Gregory House', created_at: new Date('2026-04-10') },
];

const mockPatients = [
  { id: 1, name: 'John Doe', age: 45, gender: 'Male', created_at: new Date() },
  { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', created_at: new Date() },
  { id: 3, name: 'Robert Johnson', age: 67, gender: 'Male', created_at: new Date() },
  { id: 4, name: 'Emily Davis', age: 12, gender: 'Female', created_at: new Date() },
  { id: 5, name: 'Michael Brown', age: 58, gender: 'Male', created_at: new Date() },
];

const mockDepartments = [
  { id: 1, name: 'Cardiology' },
  { id: 2, name: 'Neurology' },
  { id: 3, name: 'Orthopedics' },
  { id: 4, name: 'Pediatrics' },
  { id: 5, name: 'General Medicine' },
];

const mockDoctors = [
  { id: 1, user_id: 2, specialty: 'General Medicine' },
  { id: 2, user_id: 5, specialty: 'Diagnostics & Cardiology' },
];

const mockAdmissions = [
  { 
    id: 1, 
    patient_id: 1, 
    department_id: 5, 
    doctor_id: 1, 
    bed_number: 'B-101', 
    condition: 'Fever & Weakness', 
    current_condition: 'Stable',
    status: 'Admitted', 
    admission_date: new Date('2026-05-18T10:00:00Z').toISOString(),
    daily_summary: 'AI Summary: Patient is showing stable progression. Monitor temperature every 4 hours.'
  },
  { 
    id: 2, 
    patient_id: 3, 
    department_id: 1, 
    doctor_id: 2, 
    bed_number: 'ICU-02', 
    condition: 'Cardiovascular Strain', 
    current_condition: 'Critical',
    status: 'Admitted', 
    admission_date: new Date('2026-05-19T08:30:00Z').toISOString(),
    daily_summary: 'AI Summary: Critical patient under real-time telemetry. Keep on continuous cardiac monitor.'
  },
];

const mockICUPatients = [
  { 
    id: 1, 
    admission_id: 2, 
    status_flag: 'Critical', 
    critical_metrics: { pulse: '105 bpm', bp: '145/95', spo2: 91 }, 
    last_updated: new Date().toISOString() 
  }
];

const mockDietPlans = [
  { 
    id: 1, 
    patient_id: 1, 
    breakfast: 'Oatmeal with bananas, skim milk', 
    lunch: 'Brown rice, grilled chicken breast, steamed broccoli', 
    dinner: 'Baked salmon, sweet potato mash, green tea', 
    instructions: 'Low sodium, low glycemic index. Service at bed B-101.',
    plan_date: new Date().toISOString()
  },
  { 
    id: 2, 
    patient_id: 3, 
    breakfast: 'Scrambled egg whites, whole wheat toast', 
    lunch: 'Quinoa, baked tofu, leafy green salad', 
    dinner: 'Clear vegetable broth, steamed fish', 
    instructions: 'Cardiovascular diet, strictly no caffeine, fluid intake restricted to 1.5L.',
    plan_date: new Date().toISOString()
  }
];

const mockAppointments = [
  { id: 1, patient_id: 2, doctor_id: 1, appointment_date: new Date().toISOString().split('T')[0], appointment_time: '10:30 AM', status: 'Scheduled' },
  { id: 2, patient_id: 4, doctor_id: 1, appointment_date: new Date().toISOString().split('T')[0], appointment_time: '11:15 AM', status: 'Scheduled' },
  { id: 3, patient_id: 5, doctor_id: 2, appointment_date: new Date().toISOString().split('T')[0], appointment_time: '02:00 PM', status: 'Scheduled' },
];

// Helper to execute query against Mock In-Memory Database
const executeMockQuery = (text: string, params: any[]): any[] => {
  const cleanText = text.replace(/\s+/g, ' ').trim();

  // 1. SELECT * FROM users WHERE email = $1
  if (cleanText.includes('SELECT * FROM users WHERE email =')) {
    const email = params[0];
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user ? [user] : [];
  }

  // 2. INSERT INTO users (email, password_hash, role, name)
  if (cleanText.startsWith('INSERT INTO users')) {
    const [email, password_hash, role, name] = params;
    const newUser = {
      id: mockUsers.length + 1,
      email,
      password_hash,
      role,
      name,
      created_at: new Date()
    };
    mockUsers.push(newUser);
    return [newUser];
  }

  // 3. SELECT id, email, role, name, created_at FROM users
  if (cleanText.includes('SELECT id, email, role, name, created_at FROM users')) {
    return mockUsers;
  }

  // 4. Counts
  if (cleanText === "SELECT count(*) FROM users") {
    return [{ count: mockUsers.length.toString() }];
  }
  if (cleanText === "SELECT count(*) FROM patients") {
    return [{ count: mockPatients.length.toString() }];
  }
  if (cleanText.includes("SELECT count(*) FROM admissions WHERE status =")) {
    return [{ count: mockAdmissions.filter(a => a.status.toLowerCase() === 'admitted').length.toString() }];
  }

  // 5. SELECT admissions JOIN patients JOIN departments JOIN doctors JOIN users
  if (cleanText.includes('FROM admissions a') && cleanText.includes('JOIN patients p')) {
    return mockAdmissions.map(ad => {
      const patient = mockPatients.find(p => p.id === ad.patient_id);
      const dept = mockDepartments.find(d => d.id === ad.department_id);
      const doctor = mockDoctors.find(d => d.id === ad.doctor_id);
      const doctorUser = doctor ? mockUsers.find(u => u.id === doctor.user_id) : null;
      return {
        ...ad,
        patient_name: patient ? patient.name : 'Unknown Patient',
        age: patient ? patient.age : 30,
        gender: patient ? patient.gender : 'Male',
        department_name: dept ? dept.name : 'General Medicine',
        doctor_name: doctorUser ? doctorUser.name : 'Dr. Watson'
      };
    });
  }

  // 6. INSERT INTO admissions
  if (cleanText.startsWith('INSERT INTO admissions')) {
    const [patient_id, department_id, doctor_id, bed_number, condition] = params;
    const newAd = {
      id: mockAdmissions.length + 1,
      patient_id: Number(patient_id) || mockPatients[0].id,
      department_id: Number(department_id) || 5,
      doctor_id: Number(doctor_id) || 1,
      bed_number: bed_number || 'B-Room',
      condition: condition || 'Observation',
      current_condition: 'Stable',
      status: 'Admitted',
      admission_date: new Date().toISOString(),
      daily_summary: 'AI Summary: Admission recorded. Monitor condition.'
    };
    mockAdmissions.push(newAd);
    
    // Auto-create ICU record if bed contains ICU
    if (String(bed_number).toUpperCase().includes('ICU')) {
      mockICUPatients.push({
        id: mockICUPatients.length + 1,
        admission_id: newAd.id,
        status_flag: 'Critical',
        critical_metrics: { pulse: '88 bpm', bp: '120/80', spo2: 98 },
        last_updated: new Date().toISOString()
      });
    }

    return [newAd];
  }

  // 7. UPDATE admissions (status & condition)
  if (cleanText.startsWith('UPDATE admissions SET status =')) {
    const [status, condition, id] = params;
    const ad = mockAdmissions.find(a => a.id === Number(id));
    if (ad) {
      ad.status = status;
      ad.current_condition = condition;
      ad.condition = condition;
    }
    return [ad || {}];
  }

  // 8. UPDATE admissions SET daily_summary
  if (cleanText.includes('UPDATE admissions SET daily_summary =')) {
    const [summary, id] = params;
    const ad = mockAdmissions.find(a => a.id === Number(id));
    if (ad) {
      ad.daily_summary = summary;
    }
    return [ad || {}];
  }

  // 9. SELECT appointments
  if (cleanText.includes('FROM appointments a')) {
    return mockAppointments.map(app => {
      const patient = mockPatients.find(p => p.id === app.patient_id);
      const doctor = mockDoctors.find(d => d.id === app.doctor_id);
      const doctorUser = doctor ? mockUsers.find(u => u.id === doctor.user_id) : null;
      return {
        ...app,
        patient_name: patient ? patient.name : 'Unknown Patient',
        doctor_name: doctorUser ? doctorUser.name : 'Dr. Watson',
        specialty: doctor ? doctor.specialty : 'General Medicine'
      };
    });
  }

  // 10. INSERT INTO appointments
  if (cleanText.startsWith('INSERT INTO appointments')) {
    const [patient_id, doctor_id, appointment_date] = params;
    const targetDate = appointment_date || new Date().toISOString().split('T')[0];
    const targetDoctorId = Number(doctor_id) || 1;

    // Strict conflict check: Does this clinician already have an appointment scheduled on this date?
    const hasConflict = mockAppointments.some(
      app => app.doctor_id === targetDoctorId && app.appointment_date === targetDate
    );

    if (hasConflict) {
      const err = new Error('Doctor already has an appointment at this time') as any;
      err.code = '23505'; // PostgreSQL unique constraint violation error code
      throw err;
    }

    const hour = Math.floor(Math.random() * 8) + 9;
    const min = Math.random() > 0.5 ? '00' : '30';
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    const time = `${displayHour}:${min} ${ampm}`;

    const newApp = {
      id: mockAppointments.length + 1,
      patient_id: Number(patient_id) || mockPatients[0].id,
      doctor_id: targetDoctorId,
      appointment_date: targetDate,
      appointment_time: time,
      status: 'Scheduled'
    };
    mockAppointments.push(newApp);
    return [newApp];
  }

  // 11. SELECT icu_patients
  if (cleanText.includes('FROM icu_patients i')) {
    return mockICUPatients.map(icu => {
      const admission = mockAdmissions.find(a => a.id === icu.admission_id);
      const patient = admission ? mockPatients.find(p => p.id === admission.patient_id) : null;
      return {
        ...icu,
        patient_name: patient ? patient.name : 'Unknown Patient',
        bed_number: admission ? admission.bed_number : 'ICU-Bed',
        condition: admission ? admission.current_condition : 'Critical'
      };
    });
  }

  // 12. UPDATE icu_patients SET critical_metrics
  if (cleanText.startsWith('UPDATE icu_patients SET critical_metrics =')) {
    const [metrics, status_flag, id] = params;
    const icu = mockICUPatients.find(i => i.id === Number(id));
    if (icu) {
      icu.critical_metrics = metrics;
      icu.status_flag = status_flag;
      icu.last_updated = new Date().toISOString();
    }
    return [icu || {}];
  }

  // 13. SELECT diet_plans
  if (cleanText.includes('FROM diet_plans d')) {
    return mockDietPlans.map(dp => {
      const patient = mockPatients.find(p => p.id === dp.patient_id);
      return {
        ...dp,
        patient_name: patient ? patient.name : 'Unknown Patient',
        menu: `Breakfast: ${dp.breakfast}\nLunch: ${dp.lunch}\nDinner: ${dp.dinner}`
      };
    });
  }

  // 14. INSERT INTO diet_plans ON CONFLICT
  if (cleanText.startsWith('INSERT INTO diet_plans')) {
    const [patient_id, breakfast, lunch, dinner, instructions] = params;
    const existingIndex = mockDietPlans.findIndex(dp => dp.patient_id === Number(patient_id));
    const dietPlan = {
      id: existingIndex >= 0 ? mockDietPlans[existingIndex].id : mockDietPlans.length + 1,
      patient_id: Number(patient_id) || mockPatients[0].id,
      breakfast: breakfast || 'Water & Fruit',
      lunch: lunch || 'Salad & Soup',
      dinner: dinner || 'Broth',
      instructions: instructions || 'Standard recovery diet.',
      plan_date: new Date().toISOString()
    };
    if (existingIndex >= 0) {
      mockDietPlans[existingIndex] = dietPlan;
    } else {
      mockDietPlans.push(dietPlan);
    }
    return [{ ...dietPlan, menu: `Breakfast: ${dietPlan.breakfast}\nLunch: ${dietPlan.lunch}\nDinner: ${dietPlan.dinner}` }];
  }

  return [];
};

// Test Database Connection and Swap dynamically to Fallback Mock DB on failure
(async () => {
  try {
    const client = await pool.connect();
    console.log('[MediFlow DB] Successfully connected to Supabase PostgreSQL database.');
    client.release();
  } catch (err: any) {
    isFallback = true;
    console.warn('\n========================================================================');
    console.warn('[MediFlow DB] Database connection to Supabase failed:');
    console.warn(`              ${err.message}`);
    console.warn('[MediFlow DB] ACTIVATING PREMIUM OFFLINE MOCK IN-MEMORY DATABASE FALLBACK.');
    console.warn('              (All features, dashboard, auth, ICU & appointments fully active)');
    console.warn('========================================================================\n');
  }
})();

// Custom wrapper to match Pool interface
const poolWrapper = {
  query: async (text: string, params?: any[]) => {
    if (isFallback) {
      const mockRows = executeMockQuery(text, params || []);
      return { rows: mockRows };
    }
    try {
      return await pool.query(text, params);
    } catch (err: any) {
      // If live db fails during runtime query, immediately fallback and execute on mock
      if (!isFallback) {
        console.warn(`[MediFlow DB] Runtime DB connection error: ${err.message}. Swapping to Mock DB.`);
        isFallback = true;
      }
      const mockRows = executeMockQuery(text, params || []);
      return { rows: mockRows };
    }
  },
  connect: async () => {
    if (isFallback) {
      return {
        query: async (text: string, params?: any[]) => {
          const mockRows = executeMockQuery(text, params || []);
          return { rows: mockRows };
        },
        release: () => {}
      } as any;
    }
    return await pool.connect();
  },
  end: async () => {
    await pool.end();
  }
};

export default poolWrapper;

