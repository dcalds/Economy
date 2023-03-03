import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CashProps, InputUserFinancesProps } from "@/utils";
import { db, auth, storage } from "@/config/firebase";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";

export const useFinances = () => {

    const { data: session } = useSession()

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<any>([]);
    const [sumCashIn, setSumCashIn] = useState<any>(0);
    const [sumCashOut, setSumCashOut] = useState<any>(0);

    const userEmail = session?.user?.email;

    useEffect(() => {
        getUserFinances();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUserFinances = async () => {

        const financesCollectionRef = collection(db, `${userEmail}-fin`);

        try {
            setIsLoading(true);
            console.log('setIsLoading', isLoading);

            const data = await getDocs<any>(financesCollectionRef);

            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            let iniAddVal = 0, iniSubVal = 0;

            const sumCashIn = filteredData[0]?.cashIn.reduce((acc: any, cur: { amount: any; }) => acc + (Number(cur.amount)), iniAddVal);
            const sumCashOut = filteredData[0]?.cashOut.reduce((acc: any, cur: { amount: any; }) => acc + (Number(cur.amount)), iniSubVal);

            setUserData(filteredData);

            setSumCashIn(sumCashIn);
            setSumCashOut(sumCashOut);

        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const setUserFinances = async (data: InputUserFinancesProps) => {

        const financesCollectionRef = collection(db, `${userEmail}-fin`);

        try {
            setIsLoading(true);

            if (!userData[0]?.id) {
                return await addDoc(financesCollectionRef, {
                    goalEco: data.goalEco,
                    economyEco: data.economyEco,
                    montlyEco: data.montlyEco,
                    id: `${userEmail}-id`,
                    cashIn: [],
                    cashOut: [],
                });
            } else {
                const financesDoc = doc(db, `${userEmail}-fin`, userData[0]?.id);
                return await updateDoc(financesDoc, {
                    goalEco: data.goalEco,
                    economyEco: data.economyEco,
                    montlyEco: data.montlyEco,
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            getUserFinances();
        }

    }

    const setCashIn = async (data: InputUserFinancesProps) => {

        try {
            setIsLoading(true);
            const financesDoc = doc(db, `${userEmail}-fin`, userData[0]?.id);
            await updateDoc(financesDoc, {
                cashIn: [...userData[0].cashIn, {
                    amount: data.cashIn?.amount,
                    description: data.cashIn?.description,
                }],
            });
        } catch (err) {
            console.error(err);
        } finally {
            getUserFinances();
            setIsLoading(false);
        }
    }

    const updateCashIn = async (data: InputUserFinancesProps, indexEdit: number) => {

        try {
            setIsLoading(true);

            const financesDoc = doc(db, `${userEmail}-fin`, userData[0]?.id);

            userData[0].cashIn[indexEdit] = {
                amount: data.cashIn?.amount,
                description: data.cashIn?.description,
            }

            await updateDoc(financesDoc, {
                cashIn: [...userData[0].cashIn],
            });
        } catch (err) {
            console.error(err);
        } finally {
            getUserFinances();
        }
    }

    const deleteCashIn = async (indexEdit: number) => {

        try {
            setIsLoading(true);

            const financesDoc = doc(db, `${userEmail}-fin`, userData[0]?.id);
            const newCashIn = userData[0].cashIn.filter((e: CashProps, i: string | number) => i !== indexEdit);

            await updateDoc(financesDoc, {
                cashIn: [...newCashIn],
            });
        } catch (err) {
            console.error(err);
        } finally {
            getUserFinances();
        }
    }

    const setCashOut = async (data: InputUserFinancesProps) => {

        try {
            setIsLoading(true);

            const financesDoc = doc(db, `${userEmail}-fin`, userData[0]?.id);
            await updateDoc(financesDoc, {
                cashOut: [...userData[0].cashOut, {
                    amount: data.cashOut?.amount,
                    description: data.cashOut?.description,
                }],
            });
        } catch (err) {
            console.error(err);
        } finally {
            getUserFinances();
            setIsLoading(false);
        }
    }

    const updateCashOut = async (data: InputUserFinancesProps, indexEdit: number) => {

        try {
            setIsLoading(true);

            const financesDoc = doc(db, `${userEmail}-fin`, userData[0]?.id);

            userData[0].cashOut[indexEdit] = {
                amount: data.cashOut?.amount,
                description: data.cashOut?.description,
            }

            await updateDoc(financesDoc, {
                cashOut: [...userData[0].cashOut],
            });
        } catch (err) {
            console.error(err);
        } finally {
            getUserFinances();
        }
    }

    const deleteCashOut = async (indexEdit: number) => {

        try {
            setIsLoading(true);

            const financesDoc = doc(db, `${userEmail}-fin`, userData[0]?.id);
            const newCashOut = userData[0].cashOut.filter((e: CashProps, i: string | number) => i !== indexEdit);

            await updateDoc(financesDoc, {
                cashOut: [...newCashOut],
            });
        } catch (err) {
            console.error(err);
        } finally {
            getUserFinances();
        }
    }

    return {
        isLoading,
        session,
        userData,
        sumCashIn,
        sumCashOut,
        getUserFinances,
        setUserFinances,
        setCashIn,
        updateCashIn,
        deleteCashIn,
        setCashOut,
        updateCashOut,
        deleteCashOut,
    };
}