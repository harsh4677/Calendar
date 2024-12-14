import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const ExportEvents = () => {
    const { monthSelected, savedEvents } = useContext(GlobalContext);

    //Convert events data to CSV format
    const convertToCSV = (events) => {
        const headers = ["Title", "Date", "Label"];
        const rows = events.map((event) => [
            event.title,
            new Date(event.day).toLocaleDateString("en-US"),
            event.label,
        ]);
        const csvContent =
            [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
        return csvContent;
    };

    //Export of events in JSON or CSV format
    const handleExport = (type) => {
        if (!monthSelected) {
            alert("Please select a month first.");
            return;
        }

        const eventsForMonth = savedEvents.filter((event) => {
            const eventDate = new Date(event.day);
            return (
                eventDate.getFullYear() === monthSelected.year() &&
                eventDate.getMonth() === monthSelected.month()
            );
        });

        if (eventsForMonth.length === 0) {
            alert("No events available for export.");
            return;
        }

        const filename = `events-${monthSelected.year()}-${monthSelected.month() + 1}.${type}`;
        let fileContent;

        if (type === "json") {
            fileContent = JSON.stringify(eventsForMonth, null, 2);
        } else if (type === "csv") {
            fileContent = convertToCSV(eventsForMonth);
        }

        // Creating a Blob from the file content and initiating the download
        const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    };

    return (
        <div className="mt-5">
            <h3 className="text-lg font-bold">Export Events</h3>
            <button
                onClick={() => handleExport("json")}
                className="text-white bg-blue-500 px-3 py-1 rounded mt-2 mr-2"
            >
                Export as JSON
            </button>
            <button
                onClick={() => handleExport("csv")}
                className="text-white bg-green-700 px-3 py-1 rounded mt-2 mr-2"
            >
                Export as CSV
            </button>
        </div>
    );
};

export default ExportEvents;
