export const unixTimestampToReadable = (timestamp) => {
    // Convert UNIX timestamp to milliseconds
    const date = new Date(timestamp * 1000);

    // Extract date components
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Construct formatted date string
    const formattedDate = `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;

    // Extract time components
    const hour = date.getHours();
    const minute = date.getMinutes();

    // Construct formatted time string
    const formattedTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

    // Return object with formatted date and time strings as properties
    return { formattedDate, formattedTime };
};
