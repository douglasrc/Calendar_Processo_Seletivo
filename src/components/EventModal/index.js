import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context";
import Modal from 'react-modal';

import "./index.scss";

Modal.setAppElement("#root");

const labelsClasses = [
    "indigo",
    "gray",
    "green",
    "blue",
    "red",
    "purple",
];

export const EventModal = () => {
    const {
        setShowEventModal,
        daySelected,
        dispatchCalEvent,
        selectedEvent,
    } = useContext(GlobalContext);

    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : ""
    );
    const [description, setDescription] = useState(
        selectedEvent ? selectedEvent.description : ""
    );
    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent
            ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
            : labelsClasses[0]
    );

    function handleSubmit(e) {
        e.preventDefault();
        const calendarEvent = {
            title,
            description,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),
        };
        if (selectedEvent) {
            dispatchCalEvent({ type: "update", payload: calendarEvent });
        } else {
            dispatchCalEvent({ type: "push", payload: calendarEvent });
        }

        setShowEventModal(false);
    }
    return (
        <Modal isOpen={() => setShowEventModal(true)}
            onRequestClose={() => setShowEventModal(false)}
            className="form-modal"
            overlayClassName="modal-overlay"
            contentLabel="modal">
            <div className="container-modal">
                <form className="form">
                    <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                        <span className="material-icons-outlined text-gray-400">

                        </span>
                        <div className="buttons">
                            {selectedEvent && (

                                <button className="delete">
                                    <span
                                        onClick={() => {
                                            dispatchCalEvent({
                                                type: "delete",
                                                payload: selectedEvent,
                                            });
                                            setShowEventModal(false);
                                        }}

                                    >
                                        delete
                                    </span>
                                </button>

                            )}
                            <button onClick={() => setShowEventModal(false)}
                                className="close">
                                <span className="material-icons-outlined text-gray-400">
                                    close
                                </span>
                            </button>
                        </div>
                    </header>
                    <div className="p-3">
                        <div className="grid grid-cols-1/5 items-end gap-y-7">
                            <div></div>
                            <input
                                type="text"
                                name="title"
                                placeholder="Título"
                                value={title}
                                required
                                className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <p>{daySelected.format("dddd, MMMM DD")}</p>
                            <span className="material-icons-outlined text-gray-400">

                            </span>
                            <input
                                type="text"
                                name="description"
                                placeholder="Descrição"
                                value={description}
                                required
                                className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <span className="material-icons-outlined text-gray-400">

                            </span>
                            <div className="flex gap-x-2">
                                {labelsClasses.map((lblClass, i) => (
                                    <span
                                        key={i}
                                        onClick={() => setSelectedLabel(lblClass)}
                                        className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                                    >
                                        {selectedLabel === lblClass && (
                                            <span className="material-icons-outlined text-white text-sm">
                                                check
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <footer className="flex justify-end border-t p-3 mt-5">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                        >
                            Save
                        </button>
                    </footer>
                </form>
            </div>
        </Modal>

    );
}
export default EventModal;