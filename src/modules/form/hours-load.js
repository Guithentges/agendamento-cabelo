import { openHours } from "../../utils/open-hours.js"
import dayjs from "dayjs"
import { hoursClick } from "./hours-click.js"

const hours = document.getElementById("hours")

let nove = 0
export function hoursLoad({date, dailySchedules}){
    hours.innerHTML = ""
    const unavailableHours = dailySchedules.map((schedule) => dayjs(schedule.when).format("HH:mm")) 
    if(unavailableHours.includes("09:00")){
        nove = 1
    }
    const open = openHours.map((hour) => {
        const [scheduleHour] = hour.split(":")
        const isPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs())
        let available = !unavailableHours.includes(hour) && !isPast
        if(nove === 1){
            if(hour === "9:00"){
                available = false
            }
        }
        nove = 0
        return {
            hour,
            available,
        }

    })

    open.forEach(({hour, available}) => {
        const li = document.createElement("li")
        li.classList.add("hour")
        if(available){
            li.classList.add("hour-available")
        }else{
            li.classList.add("hour-unavailable")
        }
        li.textContent = hour

        if(hour === "9:00"){
            hourHeaderAdd("Manhã")
        }
        else if(hour === "13:00"){
            hourHeaderAdd("Tarde")
        }
        else if(hour === "18:00"){
            hourHeaderAdd("Noite")
        }

        hours.append(li)
    })

    hoursClick()

}

function hourHeaderAdd(title){
    const header = document.createElement("li")
    header.classList.add("hour-period")
    header.textContent = title
    hours.append(header)
}