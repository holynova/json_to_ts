export const isValidArray = (input: any) => {
  return Array.isArray(input) && input.length > 0;
};

type Factor = string | number;
type FactorGroup = Factor[];
type FactorGroupList = Factor[][];
export type ResultList = Factor[][];

export class CombinationCreator {
  getFactorsFromText(text: string): FactorGroupList {
    const res: FactorGroupList = [];
    const lines = text.trim().split(/\n+/g);
    lines.forEach((line) => {
      res.push(line.trim().split(/[,\t\s]+/g));
    });
    return res;
  }

  getResultCount({
    text,
    removeDuplicated = false,
  }: {
    text: string;
    removeDuplicated: boolean;
  }) {
    const factorGroupList = this.getFactorsFromText(text);
    return factorGroupList.reduce((prev, cur) => {
      if (removeDuplicated) {
        return prev * Array.from(new Set(cur)).length;
      }
      return prev * cur.length;
    }, 1);
  }

  combine(
    factorGroups: FactorGroupList,
    removeDuplicated?: boolean,
  ): ResultList {
    const combineTwo = (aList: any[], originBList: Factor[]) => {
      const bList = removeDuplicated
        ? Array.from(new Set(originBList))
        : originBList;

      const aValid = isValidArray(aList);
      const bValid = isValidArray(bList);
      if (!aValid && !bValid) {
        return [];
      }
      if (!aValid) {
        return bList;
      }
      if (!bValid) {
        return aList;
      }
      let res = [];
      for (const a of aList) {
        for (const b of bList) {
          if (isValidArray(a)) {
            res.push([...a, b]);
          } else {
            res.push([a, b]);
          }
        }
      }
      return res;
    };
    let res = [];
    for (let i = 0; i < factorGroups.length; i++) {
      res = combineTwo(res, factorGroups[i]);
    }
    const isOneDimensionArray = (val: any) => {
      return isValidArray(val) && !Array.isArray(val[0]);
    };
    return isOneDimensionArray(res) ? [res] : res;
  }

  printResult(list: FactorGroupList) {
    console.log(JSON.stringify(this.toString(list), null, 2));
  }

  toString(result: ResultList, showRowNumber?: boolean) {
    if (!isValidArray(result)) {
      return "-";
    }
    let resultItemStringList = result
      .map((x, index) => {
        return isValidArray(x) ? x.join(",") : x;
      })
      .sort()
      .map((x, index) => {
        return `${showRowNumber ? index + 1 : ""}${
          showRowNumber ? "," : ""
        }${x}`;
      });
    return resultItemStringList.join("\n");
  }

  toExcel() {}
  toCSV(result: ResultList) {
    return this.toString(result, true);
  }
  toAntDesignTable(result: ResultList) {
    const getKeyByIndex = (index: number) => {
      if (typeof index === "undefined") {
        throw new Error("getKeyByIndex: index should be number");
      }
      return `dataKey${index}`;
    };
    // const dataSource = [];
    // const columns = [];
    let columnCount = 0;
    // const
    if (isValidArray(result) && isValidArray(result?.[0])) {
      columnCount = result[0].length;
    }
    const dataSource = result.map((row) => {
      return row.reduce((prev: Record<string, any>, cur, index) => {
        prev[getKeyByIndex(index)] = cur;
        return prev;
      }, {});
    });

    const columns = new Array(columnCount).fill(null).map((x, index) => {
      const key = getKeyByIndex(index);
      return {
        title: `factor${index}`,
        dataIndex: key,
        key: key,
        sorter: (rowA, rowB) => {
          const a = rowA[key];
          const b = rowB[key];

          if (a < b) {
            return -1;
          } else if (a > b) {
            return 1;
          }
          return 0;
        },
      };
    });

    return { columns, dataSource };
  }

  go(text: string, removeDuplicated?: boolean) {
    const factorList = this.getFactorsFromText(text);
    const res = this.combine(factorList, removeDuplicated);
    // this.printResult(res);
    return res;
  }
}
