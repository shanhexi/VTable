import * as VTable from '../../src';
import { bindDebugTool } from '../../src/scenegraph/debug-tool';
const Table_CONTAINER_DOM_ID = 'vTable';
export function createTable() {
  fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/VTable/North_American_Superstore_data.json')
    .then(res => res.json())
    .then(data => {
      const categorys = ['Office Supplies', 'Technology', 'Furniture'];
      const colorToCategory = ['rgba(255, 127, 14,1)', 'rgba(227, 119, 194, 1)', 'rgba(44, 160, 44, 1)'];
      const colorToCategoryUnactive = ['rgba(255, 127, 14, .2)', 'rgba(227, 119, 194, .2)', 'rgba(44, 160, 44, .2)'];

      const columns = [
        {
          field: 'Order ID',
          caption: 'Order ID',
          width: 'auto'
        },
        {
          field: 'Customer ID',
          caption: 'Customer ID',
          width: 'auto'
        },
        {
          field: 'Product Name',
          caption: 'Product Name',
          width: '200'
        },
        {
          field: 'Category',
          caption: 'Category',
          width: 'auto',
          style: {
            // bgColor(args) {
            //   const index = categorys.indexOf(args.value);
            //   return colorToCategory[index];
            // }
          }
        },
        {
          field: 'Sub-Category',
          caption: 'Sub-Category',
          width: 'auto'
        },
        {
          field: 'Region',
          caption: 'Region',
          width: 'auto'
        },
        {
          field: 'City',
          caption: 'City',
          width: 'auto'
        },
        {
          field: 'Order Date',
          caption: 'Order Date',
          width: 'auto'
        },
        {
          field: 'Quantity',
          caption: 'Quantity',
          width: 'auto'
        },
        {
          field: 'Sales',
          caption: 'Sales',
          width: 'auto'
        },
        {
          field: 'Profit',
          caption: 'Profit',
          width: 'auto'
        }
      ];

      const option = {
        records: data,
        columns,
        widthMode: 'standard',
        tooltip: {
          isShowOverflowTextTooltip: true
        },
        theme: VTable.themes.DEFAULT.extends({
          bodyStyle: {
            bgColor(args) {
              const { row, col } = args;
              const record = args.table.getRecordByRowCol(col, row);
              return colorToCategory[categorys.indexOf(record.Category)];
            }
          }
        }),
        legends: {
          data: [
            {
              label: 'Office Supplies',
              shape: {
                fill: '#ff7f0e',
                symbolType: 'circle'
              }
            },
            {
              label: 'Technology',
              shape: {
                fill: '#e377c2',
                symbolType: 'square'
              }
            },
            {
              label: 'Furniture',
              shape: {
                fill: '#2ca02c',
                symbolType: 'circle'
              }
            }
          ],
          orient: 'top',
          position: 'start',
          maxRow: 1,
          padding: 10
        }
      };
      const tableInstance = new VTable.ListTable(document.getElementById(Table_CONTAINER_DOM_ID), option);
      window.tableInstance = tableInstance;
      const { LEGEND_ITEM_CLICK } = VTable.ListTable.EVENT_TYPE;
      tableInstance.on(LEGEND_ITEM_CLICK, args => {
        const highlightCategorys = args.value;
        console.log('LEGEND_ITEM_CLICK', args.value);
        tableInstance.updateTheme(
          VTable.themes.DEFAULT.extends({
            bodyStyle: {
              color(args) {
                const { row, col } = args;
                const record = tableInstance.getRecordByRowCol(col, row);
                if (highlightCategorys.indexOf(record.Category) >= 0) {
                  return 'black';
                }
                return '#e5dada';
              },
              bgColor(args) {
                const { row, col } = args;
                const record = tableInstance.getRecordByRowCol(col, row);
                if (highlightCategorys.indexOf(record.Category) >= 0) {
                  return colorToCategory[categorys.indexOf(record.Category)];
                }
                return colorToCategoryUnactive[categorys.indexOf(record.Category)];
              }
            }
          })
        );
        console.log(tableInstance.stateManeger?.select);
      });
    });
}
