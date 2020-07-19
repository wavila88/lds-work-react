import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './BusquedaComponent.scss';
// import image from '../../resources/lol.png'

import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Panel } from 'primereact/panel';
import { UsuarioService } from './UsuarioService';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';


const BusquedaComponent = () => {
    const [usuarios, setusuarios] = useState([]);
    const [layout, setLayout] = useState('list');
    const [SelectedUser, setSelectedUser] = useState(null);
    const [visible, setVisible] = useState(false);
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const usuarioService = new UsuarioService();

    const traerUsurios = async () => {
        const json2 = await usuarioService.getUsuarios();
        const finalResult = await json2.json();
        debugger
        setusuarios(finalResult);
    }

    useEffect(() => {
        traerUsurios();

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onSortChange = (event) => {
        const value = event.value;
        let _sortOrder;
        let _sortField;
        let _sortKey = value;
        if (value.indexOf('!') === 0) {
            _sortOrder = -1;
            _sortField = value.substring(1, value.length);
        }
        else {
            _sortOrder = 1;
            _sortField = value;
        }

        setSortOrder(_sortOrder);
        setSortField(_sortField);
        setSortKey(_sortKey);
    };

    const renderListItem = (user) => {
        const data = user.imagen;
        return (
            <div className="p-col-12">
                <div className="car-details">
                    <div>
                        <img src={data} srcSet={typeof data === 'undefined' ? 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png' : data} alt={user.brand} height="100" width="80" />
                        <div className="p-grid">
                            <div className="p-col-12">Nombres: <b>{user.nombres} </b></div>
                            <div className="p-col-12">Apellidos: <b>{user.apellidos}</b></div>
                           <div className="p-col-12">Barrio: <b>{user.Barrio.length !== 0 ? user.Barrio[0].nombreBarrio : ''}</b></div> 
                            <div className="p-col-12">Sector de trabajo: <b>{user.Sector.length !== 0 ? user.Sector[0].nombreSector : ''}</b></div>  
                        </div>
                    </div>
                    <Button icon="pi pi-search" onClick={(e) => { setSelectedUser(user); setVisible(true) }}></Button>
                </div>
            </div>
        );
    };

    const renderGridItem = (user) => {
        return (
            <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
                <Panel header={user.nombres + ' ' + user.apellidos} style={{ textAlign: 'center' }}>
                    <img src={user.imagen} srcSet={typeof user.imagen === 'undefined' ? 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png' : user.imagen} alt={user.nombres} height="200" width="200" />
                    <div className="car-detail">{user.Barrio.length !== 0 ? user.Barrio[0].nombreBarrio : ''} - {typeof user.Sector[0] !== 'undefined' ? user.Sector[0].nombreSector : ''} </div>
                    <Button icon="pi pi-search" onClick={(e) => { setSelectedUser(user); setVisible(true) }}></Button>
                </Panel>
            </div>
        );
    };

    const itemTemplate = (user, layout) => {
        if (!user) {
            return <p></p>;
        }

        if (layout === 'list')
            return renderListItem(user);
        else if (layout === 'grid')
            return renderGridItem(user);
    };

    const renderCarDialogContent = () => {
        if (SelectedUser) {
            return (
                <div className="p-grid" style={{ fontSize: '16px', textAlign: 'center', padding: '20px' }}>
                    <div className="p-col-12" style={{ textAlign: 'center' }}>
                        <img src={SelectedUser.imagen} srcSet={typeof SelectedUser.imagen === 'undefined' ? 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png' : SelectedUser.imagen} alt={SelectedUser.nombres} height="200" width="200" />
                    </div>

                    <div className="p-col-4">Nombres: </div>
                    <div className="p-col-8">{SelectedUser.nombres}</div>

                    <div className="p-col-4">Apellidos: </div>
                    <div className="p-col-8">{SelectedUser.apellidos}</div>

                    <div className="p-col-4">Estaca: </div>
                    <div className="p-col-8">{SelectedUser.Estaca.length !== 0 ? SelectedUser.Estaca[0].nombreEstaca : ''}</div>

                    <div className="p-col-4">Barrio: </div>
                    <div className="p-col-8">{SelectedUser.Barrio.length !== 0 ? SelectedUser.Barrio[0].nombreBarrio : ''}</div>

                    <div className="p-col-4">Sector Trabajo: </div>
                    <div className="p-col-8">{SelectedUser.Sector.length !== 0 ? SelectedUser.Sector[0].nombreSector : ''}</div>

                    <div className="p-col-4">Correo: </div>
                    <div className="p-col-8">{SelectedUser.correo}</div>

                    <div className="p-col-4">Celular: </div>
                    <div className="p-col-8">{SelectedUser.celular}</div>
                
                </div>
            );
        }
        else {
            return (<p></p>);
        }
    };

    const renderHeader = () => {
        const sortOptions = [
            { label: 'Recientes', value: '!nombres' },
            { label: 'Anteriores', value: 'nombres' },
            { label: 'correo', value: 'correo' }
        ];
        return (
            <div className="p-grid">
                <div className="p-col-6" style={{ textAlign: 'left' }}>
                    <Dropdown options={sortOptions} value={sortKey} placeholder="Sort By" onChange={onSortChange} style={{ width: '12em' }} />
                </div>
                <div className="p-col-6" style={{ textAlign: 'right' }}>
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    };

    const header = renderHeader();

    return (
        <div className="dataview-demo">
            <DataView value={usuarios} layout={layout} header={header}
                itemTemplate={itemTemplate} paginatorPosition={'both'} paginator={true} rows={20}
                sortOrder={sortOrder} sortField={sortField} />

            <Dialog header="Detalles de usuario" visible={visible} modal={true} onHide={() => setVisible(false)}>
                {renderCarDialogContent()}
            </Dialog>
        </div>
    );

}

export default BusquedaComponent;