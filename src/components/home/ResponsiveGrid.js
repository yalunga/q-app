import React from 'react';
import { ResponsiveContext, Grid, Box } from 'grommet';
// columns, rows and areas are for Grid with a known number of contents / boxes.

// If the size is small, we only see 1 column
// If the size is medium, we only see 2 columns
// If the size is either large or xlarge, we see 3 columns
const columns = {
    small: ["auto"],
    medium: ["auto", "auto"],
    large: ["auto", "auto", "auto"],
    xlarge: ["auto", "auto", "auto"]
};

// If the size is small, we have 3 rows
// If the size is medium, we have 2 rows
// If the size is large or xlarge, we have 1 row
const rows = {
    small: ["auto", "auto", "auto"],
    medium: ["auto", "auto"],
    large: ["auto"],
    xlarge: ["auto"]
};

// Set the different areas you need for every size
const fixedGridAreas = {
    small: [
        { name: "header", start: [0, 0], end: [0, 0] },
        { name: "test", start: [0, 1], end: [0, 1] },
        { name: "test1", start: [0, 2], end: [0, 2] }
    ],
    medium: [
        { name: "header", start: [0, 0], end: [1, 0] },
        { name: "test", start: [0, 1], end: [0, 1] },
        { name: "test1", start: [1, 1], end: [1, 1] }
    ],
    large: [
        { name: "header", start: [0, 0], end: [0, 0] },
        { name: "test", start: [1, 0], end: [1, 0] },
        { name: "test1", start: [2, 0], end: [2, 0] }
    ],
    xlarge: [
        { name: "header", start: [0, 0], end: [0, 0] },
        { name: "test", start: [1, 0], end: [1, 0] },
        { name: "test1", start: [2, 0], end: [2, 0] }
    ]
};

const Responsive = ({
    children,
    overrideColumns,
    overrideRows,
    areas,
    ...props
}) => (
        <ResponsiveContext.Consumer>
            {size => {
                // Take into consideration if not array is sent but a simple string
                let columnsVal = columns;
                if (columns) {
                    if (columns[size]) {
                        columnsVal = columns[size];
                    }
                }

                let rowsVal = rows;
                if (rows) {
                    if (rows[size]) {
                        rowsVal = rows[size];
                    }
                }

                // Also if areas is a simple array not an object of arrays for
                // different sizes
                let areasVal = areas;
                if (areas && !Array.isArray(areas)) areasVal = areas[size];

                return (
                    <Grid
                        {...props}
                        areas={!areasVal ? undefined : areasVal}
                        rows={!rowsVal ? size : rowsVal}
                        columns={!columnsVal ? size : columnsVal}
                    >
                        {children}
                    </Grid>
                );
            }}
        </ResponsiveContext.Consumer>
    );

export default ({ children }) => (
    <Box>
        <Responsive
            rows={rows}
            columns={columns}
            gap='medium'
            areas={fixedGridAreas}
        >
            {children}
        </Responsive>
    </Box>
);