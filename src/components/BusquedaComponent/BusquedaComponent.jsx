import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './BusquedaComponent.scss';


import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Panel } from 'primereact/panel';
import { CarService } from './carService';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const BusquedaComponent = () => {
    const [cars, setCars] = useState([]);
    const [layout, setLayout] = useState('list');
    const [selectedCar, setSelectedCar] = useState(null);
    const [visible, setVisible] = useState(false);
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const carservice = new CarService();

    useEffect(() => {
       const json = carservice.getCarsLarge();
       setCars(json);
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

    const renderListItem = (car) => {
        return (
            <div className="p-col-12">
                <div className="car-details">
                    <div>
                        <img src={`showcase/demo/images/car/${car.brand}.png`} srcSet="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt={car.brand}/>
                        <div className="p-grid">
                            <div className="p-col-12">Vin: <b>{car.vin}</b></div>
                            <div className="p-col-12">Year: <b>{car.year}</b></div>
                            <div className="p-col-12">Brand: <b>{car.brand}</b></div>
                            <div className="p-col-12">Color: <b>{car.color}</b></div>
                        </div>
                    </div>
                    <Button icon="pi pi-search" onClick={(e) => {setSelectedCar(car); setVisible(true)}}></Button>
                </div>
            </div>
        );
    };

    const renderGridItem = (car) => {
        return (
            <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
                <Panel header={car.vin} style={{ textAlign: 'center' }}>
                    <img src={`showcase/demo/images/car/${car.brand}.png`} srcSet="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt={car.brand} />
                    <div className="car-detail">{car.year} - {car.color}</div>
                    <Button icon="pi pi-search" onClick={(e) => {setSelectedCar(car); setVisible(true)}}></Button>
                </Panel>
            </div>
        );
    };

    const itemTemplate = (car, layout) => {
        if (!car) {
            return;
        }

        if (layout === 'list')
            return renderListItem(car);
        else if (layout === 'grid')
            return renderGridItem(car);
    };

    const renderCarDialogContent = () => {
        if (selectedCar) {
            return (
                <div className="p-grid" style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>
                    <div className="p-col-12" style={{textAlign: 'center'}}>
                        <img src={`showcase/demo/images/car/${selectedCar.brand}.png`} srcSet="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt={selectedCar.brand} />
                    </div>

                    <div className="p-col-4">Vin: </div>
                    <div className="p-col-8">{selectedCar.vin}</div>

                    <div className="p-col-4">Year: </div>
                    <div className="p-col-8">{selectedCar.year}</div>

                    <div className="p-col-4">Brand: </div>
                    <div className="p-col-8">{selectedCar.brand}</div>

                    <div className="p-col-4">Color: </div>
                    <div className="p-col-8">{selectedCar.color}</div>
                </div>
            );
        }
        else {
            return null;
        }
    };

    const renderHeader = () => {
        const sortOptions = [
            {label: 'Newest First', value: '!year'},
            {label: 'Oldest First', value: 'year'},
            {label: 'Brand', value: 'brand'}
        ];

        return (
            <div className="p-grid">
                <div className="p-col-6" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={sortKey} placeholder="Sort By" onChange={onSortChange} style={{width: '12em'}} />
                </div>
                <div className="p-col-6" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    };

    const header = renderHeader();

    return (
        <div className="dataview-demo">
            <DataView value={cars} layout={layout} header={header}
                    itemTemplate={itemTemplate} paginatorPosition={'both'} paginator={true} rows={20}
                    sortOrder={sortOrder} sortField={sortField} />

            <Dialog header="Car Details" visible={visible} modal={true} onHide={() => setVisible(false)}>
                {renderCarDialogContent()}
            </Dialog>
        </div>
    );
}
                
export default BusquedaComponent;