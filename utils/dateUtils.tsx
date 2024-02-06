export default class dateUtils {
    public static addDaysToCurrentDate(days: number): Date {
        const currentDate = new Date();

        // Calculate the new date by adding days
        currentDate.setDate(currentDate.getDate() + days);
        return currentDate;
    }


    public static addMilliSeconds(seconds: number): Date {
        // Get the current date and time
        const currentDate = new Date();
        // Add milliseconds to the current date
        const newDate = new Date(currentDate.getTime() + seconds);
        return newDate;
    }
}