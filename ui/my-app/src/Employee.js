import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Employee extends Component {

    constructor(props) {
        super(props);

        this.state = {
            departments: [],
            employees: [],
            subAreas: [],
            modalTitle: "",
            EmployeeId: 0,
            EmployeeName: "",
            EmployeeLastName: "",
            Department: "",
            SubArea: "",
            DocumentType: "",
            DocumentNumber: "",
            PhotoPath: variables.PHOTO_URL,

            DocumentNumberFilter: "",
            EmployeeNameFilter: "",
            employeesWithoutFilter: []
        }
    }

    FilterFn() {
        var DocumentNumberFilter = this.state.DocumentNumberFilter;
        var EmployeeNameFilter = this.state.EmployeeNameFilter;

        var filteredData = this.state.employeesWithoutFilter.filter(
            function (el) {
                return el.DocumentNumber.toString().toLowerCase().includes(
                    DocumentNumberFilter.toString().trim().toLowerCase()
                ) &&
                    el.EmployeeName.toString().toLowerCase().includes(
                        EmployeeNameFilter.toString().trim().toLowerCase()
                    )
            }
        );

        this.setState({ employees: filteredData });

    }

    sortResult(prop, asc) {
        var sortedData = this.state.employeesWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });

        this.setState({ employees: sortedData });
    }

    changeDocumentNumberFilter = (e) => {
        this.state.DocumentNumberFilter = e.target.value;
        this.FilterFn();
    }
    changeEmployeeNameFilter = (e) => {
        this.state.EmployeeNameFilter = e.target.value;
        this.FilterFn();
    }

    refreshList() {

        fetch(variables.API_URL + 'employee')
            .then(response => response.json())
            .then(data => {
                this.setState({ employees: data, employeesWithoutFilter: data });
            });

        fetch(variables.API_URL + 'department')
            .then(response => response.json())
            .then(data => {
                this.setState({ departments: data });
            });

        fetch(variables.API_URL + 'subArea')
            .then(response => response.json())
            .then(data => {
                this.setState({ subAreas: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeEmployeeName = (e) => {
        this.setState({ EmployeeName: e.target.value });
    }
    changeEmployeeLastName = (e) => {
        this.setState({ EmployeeLastName: e.target.value });
    }
    changeDepartment = (e) => {
        this.setState({ Department: e.target.value });
    }
    changeSubArea = (e) => {
        this.setState({ SubArea: e.target.value });
    }
    changeDocumentType = (e) => {
        this.setState({ DocumentType: e.target.value });
    }
    changeDocumentNumber = (e) => {
        this.setState({ DocumentNumber: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Añadir Empleado",
            EmployeeId: 0,
            EmployeeName: "",
            EmployeeLastName: "",
            Department: "",
            SubArea: "",
            DocumentType: "",
            DocumentNumber: ""
        });
    }
    editClick(emp) {
        this.setState({
            modalTitle: "Editar Empleado",
            EmployeeId: emp.EmployeeId,
            EmployeeName: emp.EmployeeName,
            EmployeeLastName: emp.EmployeeLastName,
            Department: emp.Department,
            SubArea: emp.SubArea,
            DocumentType: emp.DocumentType,
            DocumentNumber: emp.DocumentNumber
        });
    }

    createClick() {
        fetch(variables.API_URL + 'employee', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeName: this.state.EmployeeName,
                EmployeeLastName: this.state.EmployeeLastName,
                Department: this.state.Department,
                SubArea: this.state.SubArea,
                DocumentType: this.state.DocumentType,
                DocumentNumber: this.state.DocumentNumber
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }


    updateClick() {
        fetch(variables.API_URL + 'employee', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeId: this.state.EmployeeId,
                EmployeeName: this.state.EmployeeName,
                EmployeeLastName: this.state.EmployeeLastName,
                Department: this.state.Department,
                SubArea: this.state.SubArea,
                DocumentType: this.state.DocumentType,
                DocumentNumber: this.state.DocumentNumber
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'employee/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    imageUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);

        fetch(variables.API_URL + 'employee/savefile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ DocumentNumber: data });
            })
    }

    render() {
        const {
            departments,
            employees,
            subAreas,
            modalTitle,
            EmployeeId,
            EmployeeName,
            EmployeeLastName,
            Department,
            SubArea,
            DocumentType,
            PhotoPath,
            DocumentNumber
        } = this.state;

        return (
            <div>

                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Añadir Empleado
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Id
                            </th>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2"
                                        onChange={this.changeEmployeeNameFilter}
                                        placeholder="Filtro por nombre de empleado" />

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('EmployeeName', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('EmployeeName', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                Nombre
                            </th>
                            <th>
                                Apellido
                            </th>
                            <th>
                                Area
                            </th>
                            <th>
                                Subarea
                            </th>
                            <th>
                                
                                Tipo de Documento
                            </th>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2"
                                        onChange={this.changeDocumentNumberFilter}
                                        placeholder="Filtro por numero de documento" />

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('DocumentNumber', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('DocumentNumber', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                Numero de Documento
                            </th>
                            <th>
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp =>
                            <tr key={emp.EmployeeId}>
                                <td>{emp.EmployeeId}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.EmployeeLastName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.SubArea}</td>
                                <td>{emp.DocumentType}</td>
                                <td>{emp.DocumentNumber}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(emp)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(emp.EmployeeId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">

                                    <div className="p-2 w-50 bd-highlight">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Nombre</span>
                                            <input type="text" className="form-control"
                                                value={EmployeeName}
                                                onChange={this.changeEmployeeName} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Area</span>
                                            <select className="form-select"
                                                onChange={this.changeDepartment}
                                                value={Department}>
                                                {departments.map(dep => <option key={dep.DepartmentId}>
                                                    {dep.DepartmentName}
                                                </option>)}
                                            </select>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Tipo de documento</span>
                                            <input type="text" className="form-control"
                                                value={DocumentType}
                                                onChange={this.changeDocumentType} />
                                        </div>

                                    </div>
                                    <div className="p-2 w-50 bd-highlight">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Apellido</span>
                                            <input type="text" className="form-control"
                                                value={EmployeeLastName}
                                                onChange={this.changeEmployeeLastName} />
                                        </div>

                                       
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Subarea</span>
                                            <select className="form-select"
                                                onChange={this.changeSubArea}
                                                value={SubArea}>
                                                {subAreas.map(dep => <option key={dep.SubAreaId}>
                                                    {dep.SubAreaName}
                                                </option>)}
                                            </select>
                                        </div>
                                        
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Numero de documento</span>
                                            <input type="text" className="form-control"
                                                value={DocumentNumber}
                                                onChange={this.changeDocumentNumber} />
                                        </div>
                                        

                                    </div>
                                </div>

                                {EmployeeId == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Crear</button>
                                    : null}

                                {EmployeeId != 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Actualizar</button>
                                    : null}
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        )
    }
}