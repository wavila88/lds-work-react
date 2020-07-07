import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './BusquedaComponent.scss';


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
     
    const traerUsurios = async () =>{
        debugger
        const json2 = await usuarioService.getUsuarios();
        const finalResult = await json2.json();
        setusuarios(finalResult);
    }
    
    useEffect(() => {
       traerUsurios();
    //     const json = usuarioService.getCarsLarge();
        
    //    setusuarios(json);
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
        return (
            <div className="p-col-12">
                <div className="car-details">
                    <div>
                        <img src={`showcase/demo/images/car/data.png`} srcSet="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt={user.brand} />
                        <div className="p-grid">
                            <div className="p-col-12">Vin: <b>{user._id}</b></div>
                            <div className="p-col-12">Year: <b>{user.nombres}</b></div>
                            <div className="p-col-12">Brand: <b>{user.apellidos}</b></div>
                            <div className="p-col-12">Color: <b>{user.correo}</b></div>
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
                <Panel header={user._id} style={{ textAlign: 'center' }}>
                    <img src={`showcase/demo/images/car/${user.nombres}.png`} srcSet="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt={user.nombres} />
                    <div className="car-detail">{user.nombres} - {user.apellidos}</div>
                    <Button icon="pi pi-search" onClick={(e) => { setSelectedUser(user); setVisible(true) }}></Button>
                </Panel>
            </div>
        );
    };

    const itemTemplate = (user, layout) => {
        debugger
        if (!user) {
            return<p></p>;
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
                        <img src={`showcase/demo/images/car/item.png`} srcSet="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt={SelectedUser.nombres} />
                    </div>

                    <div className="p-col-4">Vin: </div>
                    <div className="p-col-8">{SelectedUser._id}</div>

                    <div className="p-col-4">Year: </div>
                    <div className="p-col-8">{SelectedUser.nombres}</div>

                    <div className="p-col-4">Brand: </div>
                    <div className="p-col-8">{SelectedUser.apellidos}</div>

                    <div className="p-col-4">Color: </div>
                    <div className="p-col-8">{SelectedUser.correo}</div>
                </div>
            );
        }
        else {
            return(<p></p>);
        }
    };

    const renderHeader = () => {
    debugger
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

            <Dialog header="Car Details" visible={visible} modal={true} onHide={() => setVisible(false)}>
                {renderCarDialogContent()}
            </Dialog>
        </div>
    );

}

export default BusquedaComponent;