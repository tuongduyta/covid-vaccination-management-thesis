import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import _ from "lodash";

import { db } from "../firebase";

const fetchCitizensById = async (searchTerm) => {
  const citizens = [];
  const q = query(
    collection(db, "citizens"),
    where("idNumber", "==", searchTerm)
  );
  const rs = await getDocs(q);
  rs.forEach((citizen) => {
    const { doses } = citizen.data();
    citizens.push({ ...citizen.data(), id: citizen.id, doses: doses.length });
  });
  return citizens;
};

const fetchCitizensByFirstName = async (searchTerm) => {
  const citizens = [];
  const q = query(
    collection(db, "citizens"),
    where("firstName", "==", searchTerm)
  );
  const rs = await getDocs(q);
  rs.forEach((citizen) => {
    const { doses } = citizen.data();
    citizens.push({ ...citizen.data(), id: citizen.id, doses: doses.length });
  });
  return citizens;
};

const fetchVaccinesByName = async (searchTerm) => {
  const vaccines = [];
  const q = query(
    collection(db, "vaccines"),
    where("vaccineName", "==", searchTerm)
  );
  const rs = await getDocs(q);
  rs.forEach((vaccine) => {
    const { doses } = vaccine.data();
    vaccines.push({ ...vaccine.data(), id: vaccine.id });
  });
  return vaccines;
};

const fetchVaccinesByCode = async (searchTerm) => {
  const vaccines = [];
  const q = query(collection(db, "vaccines"), where("code", "==", searchTerm));
  const rs = await getDocs(q);
  rs.forEach((vaccine) => vaccines.push({ ...vaccine.data(), id: vaccine.id }));
  return vaccines;
};

export const fetchCitizenById = async (citizenId) => {
  const docRef = doc(db, "citizens", citizenId);
  const citizen = await getDoc(docRef);
  if (citizen.exists()) {
    const citizenDto = citizen.data();
    const { doses } = citizenDto;
    const mappedDoses = await Promise.all(
      _.map(doses, async (vaccine, index) => {
        const data = await getDoc(doc(db, vaccine.path));
        const dataRs = data.data();
        return {
          ...dataRs,
          id: data.id,
          label: `${index + 1} : ${dataRs.vaccineName}`,
        };
      })
    );
    return { ...citizenDto, doses: mappedDoses };
  }
  return null;
};

export const addCitizen = async (citizen) => {
  return await addDoc(collection(db, "citizens"), citizen);
};

export const fetchCitizens = async () => {
  const citizens = [];
  const rs = await getDocs(collection(db, "citizens"));
  rs.forEach((citizen) => {
    const { doses } = citizen.data();
    citizens.push({
      ...citizen.data(),
      id: citizen.id,
      doses: doses.length,
    });
  });
  return citizens;
};

export const fetchCitizensIncludeVaccineId = async () => {
  const citizens = [];
  const rs = await getDocs(collection(db, "citizens"));
  rs.forEach((citizen) => {
    const { doses } = citizen.data();
    const mappedDoses = doses.map((dose) => dose.id);
    citizens.push({
      ...citizen.data(),
      id: citizen.id,
      doses: mappedDoses,
    });
  });
  return citizens;
};

export const fetchCitizensByIdOrName = async (searchTerm) => {
  const idResults = await fetchCitizensById(searchTerm);
  const firstNameResults = await fetchCitizensByFirstName(searchTerm);
  return _.unionWith(idResults, firstNameResults, _.isEqual);
};

export const editCitizen = async (citizenId, editedValues) => {
  const citizenRef = doc(db, "citizens", citizenId);
  await setDoc(citizenRef, editedValues, { merge: true });
};

export const deleteCitizen = async (citizenId) => {
  await deleteDoc(doc(db, "citizens", citizenId));
};

export const fetchVaccines = async () => {
  const vaccines = [];
  const rs = await getDocs(collection(db, "vaccines"));
  rs.forEach((vaccine) => {
    vaccines.push({ ...vaccine.data(), id: vaccine.id });
  });
  return vaccines;
};

export const fetchVaccineById = async (vaccineId) => {
  const docRef = doc(db, "vaccines", vaccineId);
  const vaccine = await getDoc(docRef);
  if (vaccine.exists()) {
    return vaccine.data();
  }
  return null;
};

export const fetchVaccineByNameOrCode = async (searchTerm) => {
  const nameResults = await fetchVaccinesByName(searchTerm);
  const codeResults = await fetchVaccinesByCode(searchTerm);
  return _.unionWith(nameResults, codeResults, _.isEqual);
};

export const editVaccine = async (vaccineId, editedValues) => {
  const citizenRef = doc(db, "vaccines", vaccineId);
  await setDoc(citizenRef, editedValues, { merge: true });
};

export const addVaccine = async (vaccine) => {
  return await addDoc(collection(db, "vaccines"), vaccine);
};

export const deleteVaccination = async (vaccineId) => {
  await deleteDoc(doc(db, "vaccines", vaccineId));
};

export const createVaccineRef = (vaccineId) => {
  return doc(db, `vaccines/${vaccineId}`);
};
