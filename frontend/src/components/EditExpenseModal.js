import React from 'react'
import { useForm } from "react-hook-form"
import AuthService from "../services/auth.service"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as bootstrap from 'bootstrap';
import $ from "jquery";

export default function EditExpenseModal({ id, expenseName, categoryId, date, amount, forceRender, setForceRender, allCategory }) {
    const currentUser = AuthService.getCurrentUser();
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

    // This is used to figure out today's date, and format it accordingly
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    const hideModal = () => {
        const myModalEl = document.getElementById('id' + id);
        const modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
    };

    const onSubmit = async (data) => {
        const response = await fetch(
            "http://localhost:8080/api/expense/",
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.accessToken}`
                },
                body: JSON.stringify({
                    "expenseId": id,
                    "expenseName": data.expenseName,
                    "categoryId": data.categoryId,
                    "date": data.date,
                    "amount": data.amount
                })
            }
        )

        if (response.status === 200) {
            successMessage();
            hideModal();
        }
        else {
            (errorMessage('Klaida!'))
        }

        setForceRender(!forceRender)
    }

    // Popup message configuration
    toast.configure()
    const successMessage = () => {
        toast.success('Pakeitimai i??saugoti', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            theme: "colored",
            pauseOnHover: false,
            hideProgressBar: true
        })
    }
    const errorMessage = (msg) => {
        toast.error(msg, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            theme: "colored",
            pauseOnHover: false,
            hideProgressBar: true
        })
    }

    return (
        <>
            <button
                type="button"
                className="btn"
                data-bs-toggle="modal"
                data-bs-target={"#id" + id}
                style={{ paddingTop: 0, paddingBottom: 10 }}
            >
                <FontAwesomeIcon icon="pen-to-square" className='add__btn__expense' />
            </button>

            <div
                className="modal"
                id={"id" + id}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="staticBackdropLabel"
                            >
                                ??ra??o redagavimas
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close">
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
                            <input
                                {...register("expenseName",
                                    {
                                        required: true,
                                        minLength: 3,
                                        maxLength: 20
                                    })
                                }
                                type="text"
                                className="form-control add__description"
                                placeholder="Apra??ymas"
                                defaultValue={expenseName}
                            />
                            {errors?.expenseName?.type === "required" && <p>Laukas negali b??ti tu????ias</p>}
                            {errors?.expenseName?.type === "minLength" && <p>Apra??ymas turi b??ti sudarytas i?? bent 3 simboli??</p>}
                            {errors?.incomeName?.type === "maxLength" && <p>Apra??ymas negali b??ti ilgesnis negu 10 simboli??</p>}

                            <input
                                {...register("date",
                                    {
                                        required: true,
                                        max: today
                                    })
                                }
                                type="date"
                                className="form-control add__date mt-2"
                                placeholder="Data"
                                defaultValue={date}
                            />
                            {errors?.date?.type === "required" && <p>Laukas negali b??ti tu????ias</p>}
                            {errors?.date?.type === "max" && <p>Senesni?? nei ??iandien ??ra???? negali b??ti</p>}

                            <select {...register("categoryId",
                                {
                                    required: true,
                                })
                            }
                                className="form-control add__description"
                                type="text"
                                placeholder="Kategorija"
                                defaultValue={categoryId}
                            >
                                {allCategory.map((option) => (
                                    <option value={option.id}>{option.name}</option>
                                ))}
                            </select>
                            <input
                                {...register("amount",
                                    {
                                        required: true,
                                        min: 1
                                    })
                                }
                                type="number"
                                className="form-control add__value mt-2"
                                placeholder="Kiekis"
                                step="0.01"
                                defaultValue={amount}
                            />
                            {errors?.amount?.type === "required" && <p>Laukas negali b??ti tu????ias</p>}
                            {errors?.amount?.type === "min" && <p>Ma??iausias ??vestin?? pajam?? kiekis yra 1 &euro;</p>}

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    U??daryti
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    I??saugoti
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
