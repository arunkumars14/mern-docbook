import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currency = "$"

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        const dayDifference = today.getDate() - birthDate.getDate();

        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
          age--;
        }
      
        return age;
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const slotDateFormat = (slotDate) => {
      const dateArray = slotDate.split("_")
      return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + ", " + dateArray[2]
    }

    const value ={calculateAge, slotDateFormat, currency}


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider