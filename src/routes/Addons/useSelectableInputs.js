// Copyright (C) 2017-2022 Smart code 203358507

const React = require('react');
const { useTranslation } = require('react-i18next');

const mapSelectableInputs = (installedAddons, remoteAddons, t) => {
    const catalogSelect = {
        title: 'Select catalog',
        options: remoteAddons.selectable.catalogs
            .concat(installedAddons.selectable.catalogs)
            .map(({ name, deepLinks }) => ({
                value: deepLinks.addons,
                label: name,
                title: name
            })),
        selected: remoteAddons.selectable.catalogs
            .concat(installedAddons.selectable.catalogs)
            .filter(({ selected }) => selected)
            .map(({ deepLinks }) => deepLinks.addons),
        renderLabelText: remoteAddons.selected !== null ?
            () => {
                const selectableCatalog = remoteAddons.selectable.catalogs
                    .find(({ id }) => id === remoteAddons.selected.request.path.id);
                return selectableCatalog ? selectableCatalog.name : remoteAddons.selected.request.path.id;
            }
            :
            null,
        onSelect: (event) => {
            window.location = event.value;
        }
    };
    const typeSelect = {
        title: 'Select type',
        options: installedAddons.selected !== null ?
            installedAddons.selectable.types.map(({ type, deepLinks }) => {
                const translationKey = `TYPE_${type}`;
                const translatedType = t(translationKey);
                const label = type !== null ? translatedType === translationKey ? type : translatedType : 'All';
                return {
                    value: deepLinks.addons,
                    label
                };
            })
            :
            remoteAddons.selectable.types.map(({ type, deepLinks }) => ({
                value: deepLinks.addons,
                label: type
            })),
        selected: installedAddons.selected !== null ?
            installedAddons.selectable.types
                .filter(({ selected }) => selected)
                .map(({ deepLinks }) => deepLinks.addons)
            :
            remoteAddons.selectable.types
                .filter(({ selected }) => selected)
                .map(({ deepLinks }) => deepLinks.addons),
        renderLabelText: () => {
            return installedAddons.selected !== null ?
                installedAddons.selected.request.type === null ?
                    'All'
                    :
                    installedAddons.selected.request.type
                :
                remoteAddons.selected !== null ?
                    remoteAddons.selected.request.path.type
                    :
                    typeSelect.title;
        },
        onSelect: (event) => {
            window.location = event.value;
        }
    };
    return [catalogSelect, typeSelect];
};

const useSelectableInputs = (installedAddons, remoteAddons) => {
    const { t } = useTranslation();
    const selectableInputs = React.useMemo(() => {
        return mapSelectableInputs(installedAddons, remoteAddons, t);
    }, [installedAddons, remoteAddons]);
    return selectableInputs;
};

module.exports = useSelectableInputs;
