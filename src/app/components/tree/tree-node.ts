export interface TreeNode {
    title: string;
    showChildren: boolean;
    children: any[];
    financers: [];
    totalCost: number;
    _id: string;
    procurement: boolean;
    procurementCost: number;
    mainCostId: string;
    showInput: boolean;
}