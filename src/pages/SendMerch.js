import Box from "@mui/material/Box";
import Layout from "../layouts/default";
import { DataGrid, GridColumnMenu, GridRowModes } from "@mui/x-data-grid";
import {
  CheckboxSelectionButton,
  ClearButton,
  DeleteButton,
  MinusButton,
  PlusButton,
  CloseIconButton,
} from "../components/Buttons/Buttons";
import { SEND_MERCH_COLUMNS } from "../mocks/users-data";
import { useState } from "react";
import { randomId } from "@mui/x-data-grid-generator";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Toolbar from "../components/Toolbar/Toolbar";
import { newBaseCheckbox } from "../components/NewBaseCheckbox/NewBaseCheckbox";

export default function Promocodes({ rowData }) {
  const [rows, setRows] = useState(rowData);
  const [checkboxSelection, setCheckboxSelection] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleAddNewRow = () => {
    const id = randomId();
    console.log(id);
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        userCurator: "",
        userMerch: "",
        userHudiSize: "",
        userSocksSize: "",
        userName: "",
        userIndex: "",
        isNew: true,
      },
    ]);

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "userName" },
    }));

    // Сохранение строки
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  function showCheckboxes() {
    setCheckboxSelection(!checkboxSelection);
  }

  function resetRows() {
    setSelectionModel([]);
  }

  function deleteRows() {
    setRows((rows) => rows.filter((r) => !selectionModel.includes(r.id)));
  }

  function MenuButtons() {
    return (
      <>
        {!checkboxSelection ? (
          <CheckboxSelectionButton
            onClick={showCheckboxes}
          ></CheckboxSelectionButton>
        ) : (
          <CloseIconButton onClick={showCheckboxes}></CloseIconButton>
        )}
        {!checkboxSelection && (
          <PlusButton onClick={handleAddNewRow}></PlusButton>
        )}
        {!checkboxSelection && <MinusButton></MinusButton>}
        {checkboxSelection && (
          <DeleteButton onClick={deleteRows}></DeleteButton>
        )}
        {checkboxSelection && <ClearButton onClick={resetRows}></ClearButton>}
      </>
    );
  }

  function CustomColumnMenu(props) {
    return (
      <GridColumnMenu
        {...props}
        slots={{
          columnMenuColumnsItem: null,
        }}
      />
    );
  }

  function CustomToolbar() {
    return (
      <>
        <Toolbar checkboxSelection={checkboxSelection}>
          <MenuButtons></MenuButtons>
        </Toolbar>
      </>
    );
  }

  return (
    <Layout>
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          style={{ borderStyle: "hidden" }}
          hideFooter={true}
          slots={{
            columnMenu: CustomColumnMenu,
            toolbar: CustomToolbar,
            columnUnsortedIcon: ({ sortingOrder, ...other }) => (
              <UnfoldMoreIcon {...other} />
            ),
            columnSortedAscendingIcon: ExpandMoreIcon,
            columnSortedDescendingIcon: ExpandLessIcon,
            baseCheckbox: newBaseCheckbox,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              setRows,
              setRowModesModel,
            },
          }}
          localeText={{
            toolbarExport: "Экспортировать",
          }}
          rows={rows}
          columns={SEND_MERCH_COLUMNS}
          sx={{
            ".MuiDataGrid-columnHeaders": {
              backgroundColor: "#F9FAFB",
              minWidth: "100%",
            },
            ".MuiDataGrid-iconButtonContainer": {
              visibility: "visible",
            },
            ".MuiDataGrid-sortIcon": {
              opacity: "inherit !important",
            },
            ".MuiDataGrid-editInputCell": {
              padding: '7px 0',
              margin: '0 3px',
              backgroundColor: '#E8F2FF',
              border: '1px solid #E0E0E0',
              borderRadius:' 4px',
            }
          }}
          rowModesModel={rowModesModel}
          checkboxSelection={checkboxSelection}
          rowSelectionModel={selectionModel}
          processRowUpdate={processRowUpdate}
          onRowModesModelChange={handleRowModesModelChange}
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          disableRowSelectionOnClick
          disableColumnMenu
          editMode="row"
        />
      </Box>
    </Layout>
  );
}
