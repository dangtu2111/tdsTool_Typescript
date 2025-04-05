// Interface cho tài khoản Facebook
interface FacebookAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  cookie: string;
}

// Interface cho tài khoản TDS
interface TDSAccount {
  token: string;
  username: string;
  password: string;
  facebook: FacebookAccount[]; // mảng của tài khoản Facebook
}
const proxies = [
  '103.149.137.100:56455:stsu2o7o:sTsU2o7O',
  '103.147.185.188:12344:zsiy4l4j:zSiY4l4j',
  '157.66.158.231:56789:user:jEL7ic4u'
];
// Dữ liệu (đã chuyển từ JSON)
const tdsAccounts: TDSAccount[] = [
  {
    token: 'TDS0nI2IXZ2V2ciojIyVmdlNnIsISOwkDM1R3ZuFGZiojIyV2c1Jye',
    username: 'dangtu0909',
    password: 'tu211102',
    facebook: [
      {
        id: '100089902717451',
        name: 'nguyen_ngan',
        email: '100089902717451',
        password: 'tu@211102!',
        cookie:
          'datr=0YbvZ1z3OGw5McVbhwq2A9vy; sb=0YbvZ8wmMWmoGCQscOpAU8l2; dpr=1.25; c_user=100089902717451; xs=36%3A4Pe4PKFrnITAhQ%3A2%3A1743750880%3A-1%3A6279; fr=0wF8gz67WMc6O0kIT.AWcb_l1rWTGkCB_TkRk3kU7I_ZMGi6IwUYbiMo-173oVwo0YllQ.Bn74bR..AAA.0.0.Bn74bk.AWejjq0fpAoKFc7I-IGbFz_UFmc; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1743750886011%2C%22v%22%3A1%7D; wd=1018x704',
      },
      {
        id: '100057338434870',
        name: 'duong_ngoc_nguyen',
        email: '100057338434870',
        password: 'Quan@123',
        cookie:
          'datr=E93vZ3GFAXNXcwLuCDoCEFlL; sb=E93vZ9iHfArUF_rcLmvYI3Th; dpr=1.375; c_user=100057338434870; xs=34%3As2PKpMY-5RCp2A%3A2%3A1743772967%3A-1%3A7223; fr=0eZ31liSqNYLBYgrn.AWfSggG73Ltu8tr3nnagY3l-gDppQNqOnUPi8e50HHAf21ZHDJg.Bn790T..AAA.0.0.Bn790q.AWekAAgBRVAuMEu8yzSJOCY1mMk; ps_l=1; ps_n=1; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1743772973579%2C%22v%22%3A1%7D; wd=602x632',
      },
    ],
  },
  // {
  //   token: 'TDS0nIxIXZ2V2ciojIyVmdlNnIsISMxEjM1R3ZuFGZiojIyV2c1Jye',
  //   username: 'dangtu2111',
  //   password: 'tu211102',
  //   facebook: [
  //     {
  //       id: '61573445621892 ',
  //       name: 'Phạm Nguyễn',
  //       email: '61573445621892',
  //       password: 'leajax631z',
  //       cookie:'datr=9G3xZ-NDre_Ymd5xmWP1B9vY; sb=9G3xZ_DNXX_cpN6g_PspQx6N; dpr=1.375; c_user=61573445621892; xs=29%3AWA6feqa9eWq54w%3A2%3A1743875584%3A-1%3A12252; fr=08jNNho7cfCI4a3Zs.AWfAf3G8DuCt9wZfD7o4w0mXCbTLkaluwAxG0OOgvnW2EQVV-zc.Bn8W30..AAA.0.0.Bn8W4B.AWdIHEdp7MPM58fUPD2Ld1qnWzU; ps_l=1; ps_n=1; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1743875587542%2C%22v%22%3A1%7D; wd=693x632',
          
  //       },
  //     {
  //       id: '61559203291191',
  //       name: 'phan_huyen_trang',
  //       email: '61559203291191',
  //       password: 'tu211102',
  //       cookie:
  //         'datr=AsdRZ7Klhu3oEssMkK4UKwky; sb=AsdRZ2sLZaqhYe57c26iupO6; dpr=1.25; wd=978x738; ps_l=1; ps_n=1; locale=vi_VN; c_user=61559203291191; xs=12%3ArCsPUqhktUN2ew%3A2%3A1733413596%3A-1%3A6278; fr=0boSv9rQy9Xu7jcsg.AWWR1_3T3vv5x9aFtN7AWCLUeU0.BnUccC..AAA.0.0.BnUcre.AWWZSAXMbuA',
  //     },
  //   ],
  // },
];

// Xuất dữ liệu
export { tdsAccounts, proxies };
