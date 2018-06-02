const FilterData: any[] = [
    {
        name: '标签筛选',
        key: 'tagFiltrate',
        options: [
            {
                tag: '客户标签',
                key: 'clienteleTag',
                options: [
                    {
                        label: '重要客户',
                        value: 1
                    },
                    {
                        label: '一般客户',
                        value: 2
                    },
                    {
                        label: '老客户',
                        value: 3
                    },
                    {
                        label: '选号客户',
                        value: 4
                    },
                    {
                        label: '新客户',
                        value: 5
                    },
                    {
                        label: '潜在客户',
                        value: 6
                    }
                ]
            },
            {
                tag: '自定义标签',
                key: 'customTag',
                options: [
                    {
                        label: '大户',
                        value: 1
                    },
                    {
                        label: '拖机',
                        value: 2
                    },
                    {
                        label: '美女',
                        value: 3
                    },
                    {
                        label: '吃货',
                        value: 4
                    },
                    {
                        label: '女的',
                        value: 5
                    },
                    {
                        label: '男的',
                        value: 6
                    }
                ]
            }
        ]
    },
    {
        name: '全部客户',
        key: 'stateFiltrate',
        options: [
            {
                label: '全部客户',
                value: ''
            },
            {
                label: '待跟',
                value: 1
            },
            {
                label: '跟进',
                value: 2
            },
            {
                label: '成交',
                value: 3
            },
            {
                label: '无效',
                value: 4
            }
        ]
    },
    {
        name: '排序',
        key: 'sort',
        options: [
            {
                label: '默认排序',
                value: 1
            },
            {
                label: '创建时间',
                value: 2
            },
            {
                label: '跟进时间顺序',
                value: 3
            },
            {
                label: '跟进时间倒序',
                value: 4
            }
        ]
    }
];

export default FilterData;