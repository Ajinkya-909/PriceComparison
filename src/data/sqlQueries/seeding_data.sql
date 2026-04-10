-- Seeding data for products table
-- Total: 60 products across 10 categories
-- Categories: Smartphones, Laptops, Headphones, Shirts, Shoes, Smartwatches, Tablets, Cameras, Kitchen Appliances, Furniture

INSERT INTO public.products (
  product_id, title, category, brand, thumbnail, product_link, offers_link, 
  price, extracted_price, original_price, discount_percentage, delivery, 
  delivery_return, seller, position, rating, reviews, product_token, is_trending
) VALUES

-- Smartphones (6 items)
('13811162577366557294', 'Google Pixel 9a 5G', 'Smartphones', 'Google', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSzi35MMcdPC6WjY9eX9BZ_7WgCuMGnMZaF6stFLe_QSc2VYalNr-o6wvHQf_T1CmeIwSkYlHKqekpBiVIOmGEOdpfBV0aS8d85AN_WN-VU-tP5gQQUEhAJnQ', 
'https://www.google.com/search?q=Smartphones', 'https://www.google.com/search?q=Smartphones',
'₹39,999', 39999, '₹49,999', 20, 'Standard Delivery', '15-day returns', 'Google Store', 1, 4.7, 3100, 
'eyJxIjoiU21hcnRwaG9uZXMiLCJnbCI6ImluIiwiaGwiOiJlbiJ9', true),

('418066484130492494', 'OPPO K13 5G', 'Smartphones', 'Oppo', 
'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQSICD67UAERDp3tnZsE8mN3o2Y7vlkA__u9i_SsYKIuBqQkvDjVfLHsVzkTiVbXV0No2HDBI_xBWnuNU-px4NV0n0IWcI1iw', 
'https://www.google.com/search?q=Smartphones', 'https://www.google.com/search?q=Smartphones',
'₹6,000', 6000, NULL, NULL, 'Express Delivery', '15-day returns', 'GameLoot', 2, 4.1, 16, 
'eyJxIjoiU21hcnRwaG9uZXMiLCJnbCI6ImluIiwiaGwiOiJlbiJ9', false),

('6202672776586325724', 'Realme 16 Pro 5G', 'Smartphones', 'Realme', 
'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTZ9VrW4-v7kkrfl_iMOosDcvpMTegiDz6Y18GIqr6GWxFEeeIshWPRqSWwcCDTXNGL8DWY2pMyCgwyVHtrp2gcGTeGNZrXBmBIUyCQX0I4SbF9aWdcvF4s', 
'https://www.google.com/search?q=Smartphones', 'https://www.google.com/search?q=Smartphones',
'₹37,999', 37999, NULL, NULL, 'Free Delivery', '7-day returns', 'amazon.in', 3, 4.8, 675, 
'eyJxIjoiU21hcnRwaG9uZXMiLCJnbCI6ImluIiwiaGwiOiJlbiJ9', false),

('17978074894597273362', 'Oppo Reno15 5G', 'Smartphones', 'Oppo', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRK7hADvbsAfBhVAFX_IZmhFT76bnvx-h_yOIWPIunpJC2DKWqDPERPD3UiwxkjuHKXav6NP5ch3UMRdQkVfge73mjAS3MoRnQ1qBbcj1qERxeRCvcT9qL1', 
'https://www.google.com/search?q=Smartphones', 'https://www.google.com/search?q=Smartphones',
'₹48,999', 48999, NULL, NULL, 'Free Delivery', '10-day returns', 'Vijay Sales', 4, 4.9, 956, 
'eyJxIjoiU21hcnRwaG9uZXMiLCJnbCI6ImluIiwiaGwiOiJlbiJ9', true),

('14658515877207651442', 'Apple iPhone 17', 'Smartphones', 'Apple', 
'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQd_PJOWh8PtfPIHtqLP7lyzjrvcFZ7H12gWuxXWoD3BoQ6eTlTnHZwUbJvczQDcPDxcG68zq7Rl1idzP5CPkEzm7GHIqD4CktaE50Hl2-FwSOF9uIH_NNZUd0', 
'https://www.google.com/search?q=Smartphones', 'https://www.google.com/search?q=Smartphones',
'₹82,900', 82900, NULL, NULL, 'Premium Delivery', '7-day returns', 'Apple', 5, 4.7, 11000, 
'eyJxIjoiU21hcnRwaG9uZXMiLCJnbCI6ImluIiwiaGwiOiJlbiJ9', true),

('3555318976944671591', 'Nothing Phone Lite', 'Smartphones', 'Nothing', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS40LFX1WEXb4VVWUyORe_OujYMvGCXXsVBUPfHZRlOZ4B-61Voefr5jC_y7zo7INCW60HHPt1hSl3o8baiAMbXOicKounK1htKXM6X1kGKMgUIRBye1W9w2g', 
'https://www.google.com/search?q=Smartphones', 'https://www.google.com/search?q=Smartphones',
'₹22,099', 22099, NULL, NULL, 'Free Delivery', '10-day returns', 'Amazon.in', 6, 4.8, 199, 
'eyJxIjoiU21hcnRwaG9uZXMiLCJnbCI6ImluIiwiaGwiOiJlbiJ9', false),

-- Laptops (6 items)
('10791665414350565986', 'Lenovo Loq 15iax9 Intel Core I5 12th Gen Gaming Laptop', 'Laptops', 'Lenovo', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSvpWSeOxpJ04JUv_XEnaFOp7qAxprFxfdo2m1vq4-06J_Aep4bkm68JlMcb-A7j_g5S0dNutXF3VkxIwrF6yqC0eoFA-ZM4g', 
'https://www.google.com/search?q=Laptops', 'https://www.google.com/search?q=Laptops',
'₹72,990', 72990, NULL, NULL, 'Free delivery', '15-day returns', 'Flipkart', 1, 4.6, 2800, 
'eyJxIjoiTGFwdG9wcyIsImdsIjoiaW4iLCJobCI6ImVuIiJ9', false),

('11294397367056862755', 'ASUS TUF F16 Intel Core 5 Gaming Laptop', 'Laptops', 'ASUS', 
'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQLQOLl1dCTpwSfNQ-rLmn2JyEpvj8FcnoZztq9RkrITzoMgbPx4gGXsvrjQEU6Kv5A3h7ruiknWMrR6twQ5IIRwQC3Erd3HjhedqNXYzq5A1OtMJRGeiZv', 
'https://www.google.com/search?q=Laptops', 'https://www.google.com/search?q=Laptops',
'₹86,990', 86990, NULL, NULL, 'Free delivery', '14-day returns', 'Amazon.in', 2, 4.1, 59, 
'eyJxIjoiTGFwdG9wcyIsImdsIjoiaW4iLCJobCI6ImVuIiJ9', false),

('10681348000648308541', 'Samsung Galaxy Book5 Pro 360 Laptop', 'Laptops', 'Samsung', 
'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRwMjrWMfOmATJJvG0ybuyxS2A2D4IZNllVlZP80i6lNCUj_VloWqvLoBlEVQwZHVEjSsfWR2Bah2ZU6trrgGH6DYl-XxOQ', 
'https://www.google.com/search?q=Laptops', 'https://www.google.com/search?q=Laptops',
'₹1,55,990', 155990, NULL, NULL, 'Free delivery by Tue', '15-day returns', 'Samsung.com', 3, 4.3, 913, 
'eyJxIjoiTGFwdG9wcyIsImdsIjoiaW4iLCJobCI6ImVuIiJ9', false),

('10024940972138941007', 'ASUS Laptop Vivobook S16 OLED 7 FHD', 'Laptops', 'ASUS', 
'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS5MMKaGfBlnLxCdJT_WpWa7HYQkLtQhsuwuSDS08cYU0TQ4qxfdf2L3XKcp7m-wKkUS9m5A8bQQ-t-fGpQOVmzyVVscjJfM-qfylxuiEOj', 
'https://www.google.com/search?q=Laptops', 'https://www.google.com/search?q=Laptops',
'₹67,990', 67990, NULL, NULL, 'Free delivery', '7-day returns', 'ASUS eshop IN', 4, 4.5, 778, 
'eyJxIjoiTGFwdG9wcyIsImdsIjoiaW4iLCJobCI6ImVuIiJ9', false),

('8254785816177218105', 'Primebook 2 Max 2025', 'Laptops', 'Primebook', 
'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR0n1zei9djHAlYxAswy3Uw4x7ZvlI1KqhzAZJkQy0EfkRQ5mYlB73_yJJBaeMTaI3TsDr_SZhSFDCW2Uqw31HeGiBcrIvDV_VzGHDhWBwW', 
'https://www.google.com/search?q=Laptops', 'https://www.google.com/search?q=Laptops',
'₹28,990', 28990, '₹34,990', 17, 'Free delivery', '7-day returns', 'Flipkart', 5, 4.2, 450, 
'eyJxIjoiTGFwdG9wcyIsImdsIjoiaW4iLCJobCI6ImVuIiJ9', false),

('17291231450706498197', 'Lenovo IdeaPad Slim 3 Laptop', 'Laptops', 'Lenovo', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTwtinzD_F0hdH8F8CDWTB_p-OQT0fapmfPeoa_kxmS_k8Mvk643VhGIpJGqi2L0SDHSeAb2aqxAooiBVp035o9UEOs4YGoMCmTH1jf92ujtA4lZIPxVC_h6A', 
'https://www.google.com/search?q=Laptops', 'https://www.google.com/search?q=Laptops',
'₹68,999', 68999, NULL, NULL, 'Free next-day delivery', '7-day returns', 'Vijay Sales', 6, 4.7, 1800, 
'eyJxIjoiTGFwdG9wcyIsImdsIjoiaW4iLCJobCI6ImVuIiJ9', false),

-- Headphones (6 items)
('5244642302100089331', 'PTron Studio Evo 70hrs Playtime Wireless Over Ear Headphones', 'Headphones', 'PTron', 
'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQee09gDUNhyIgG6q6epaT_4PH23kVLMPL0RGxZkvQPdDe6-_NKx54LrYJ4FRLVX8R1M5zf8EbtANqKssRY9rtWRcTEIX8v7erSz9SZ2APFp99zzLP4-urMNw', 
'https://www.google.com/search?q=Headphones', 'https://www.google.com/search?q=Headphones',
'₹798', 798, NULL, NULL, 'Free delivery', '7-day returns', 'Amazon.in', 1, 3.8, 125, 
'eyJxIjoiSGVhZHBob25lcyIsImdsIjoiaW4iLCJobCI6ImVuIiJ9', false),

('8593483829120405491', 'boAt Rockerz 421 Bluetooth Headphones with 40Mm Drivers', 'Headphones', 'boAt', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSMpCiJTKAj7DBxLt55qxsn7i_4uQ407vGRcBI-CiMincHBZBX0cqep-5f4WRmDB8difefh5biC4EFfYR4ORlU3eMPrT_efAd_WcaI1ithpNIl7F9Vcn7yS', 
'https://www.google.com/search?q=Headphones', 'https://www.google.com/search?q=Headphones',
'₹1,299', 1299, '₹2,490', 48, 'Free delivery by Wed', '7-day returns', 'Flipkart', 2, 4.1, 8, 
'eyJxIjoiSGVhZHBob25lcyIsImdsIjoiaW4iLCJobCI6ImVuIiJ9', false),

('428137645808180850', 'Hybrid Active Noise Cancelling Wireless Over Ear Headphones', 'Headphones', 'Generic', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSVp__A10gIxCVyU0jM4twY4ns_XQgpQLODa0occjF6MMIIjCdcSC9Gob_VVEUxvL3S3VyHuH6KTRt5azsqCRWc4cC5dAncuPYl4ETUPnjRGhlnYqc9338vuA', 
'https://www.google.com/search?q=Headphones', 'https://www.google.com/search?q=Headphones',
'₹17,999', 17999, NULL, NULL, 'Free delivery', '15-day returns', 'Myntra - MNow', 3, 4.6, 298, 
'eyJxIjoiSGVhZHBob25lcyIsImdsIjoiaW4iLCJobCI6ImVuIiJ9', false),

('17241410388472888846', 'Marshall Monitor 3 Active Noise Canceling Over Ear Bluetooth Headphones', 'Headphones', 'Marshall', 
'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSRX9CwTn18UjlFo8H-GqKtZa1juLJEM1SvdypCAlqmHZ_xx1j47-U-crQKT0kDGOH2BaEQsjzqW138ErNHp0n0OVCShWDTTtxCe_tSp1xhdN6IlZjcI_PS', 
'https://www.google.com/search?q=Headphones', 'https://www.google.com/search?q=Headphones',
'₹29,999', 29999, NULL, NULL, 'Free next-day delivery', '15-day returns', 'Vijay Sales', 4, 4.8, 591, 
'eyJxIjoiSGVhZHBob25lcyIsImdsIjoiaW4iLCJobCI6ImVuIiJ9', false),

('3678216959963406225', 'Noise Airwave Max XR ANC Headphones', 'Headphones', 'Noise', 
'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRjIrYvecq4paj4APNO-Ff9LMbDXcoEpKz2W1x4ONhYgFcOoL5oFrWxEEy2hUeQtl1yXIzkyJNlt2IYEtGzs14oMNqKFHHDPP0AKuKRA_AVWh_Mx-PCwLfTvQ', 
'https://www.google.com/search?q=Headphones', 'https://www.google.com/search?q=Headphones',
'₹2,999', 2999, '₹3,324', 10, 'Free delivery', '1-day returns', 'Noise', 5, 4.9, 38, 
'eyJxIjoiSGVhZHBob25lcyIsImdsIjoiaW4iLCJobCI6ImVuIiJ9', false),

('13297388701655746914', 'boAt Rockerz Plus 550 Wireless Headphones', 'Headphones', 'boAt', 
'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSlnn57Qa-4VUO79xuF-Acz2uaf7i7HndGv2vT_PhRZdMXhbuNf47AI1XsxC7COVrVF1Zjgz1P4REba8NidogOVrffrtSREVa4eYYNzVnMz-wKr-JfYM8LG', 
'https://www.google.com/search?q=Headphones', 'https://www.google.com/search?q=Headphones',
'₹1,699', 1699, '₹1,799', 5, 'Free delivery', '7-day returns', 'boAt', 6, 4.4, 8, 
'eyJxIjoiSGVhZHBob25lcyIsImdsIjoiaW4iLCJobCI6ImVuIiJ9', false),

-- Shirts (6 items)
('9648690651667103679', 'Snitch Men''s Lining White Shirt Slim Fit Cotton', 'Shirts', 'Snitch', 
'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTdga8sYxAzw8p6S03-eeqadhJraU3BXGOJhExSvBL8mL6QImCMMGwwAan7JCcWN2gTWr3iCg6PhFIty22oIEkzGfn5_FMrk_0YtPEQmVqGcdrarWFqznAW', 
'https://www.google.com/search?q=Shirts', 'https://www.google.com/search?q=Shirts',
'₹999', 999, NULL, NULL, 'Free delivery by Mon', '7-day returns', 'snitch.com', 1, 4.2, 340, 
'eyJxIjoiU2hpcnRzIiwiZ2wiOiJpbiIsImhsIjoiZW4iIj9', false),

('101512790815560138', 'Allen Solly Men''s Solid Casual Shirt', 'Shirts', 'Allen Solly', 
'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRJp91HYYrGONVrGux2pwWmDNkHkMMwpsxwlt_MtdxK7WzEYyPhhm0SJsrqUOoQS3KtQKNLjo-LDaqcogkOsgveXtntM3WQdFsOk8wJs7MMGJJXb6E1VbyE1nY', 
'https://www.google.com/search?q=Shirts', 'https://www.google.com/search?q=Shirts',
'₹1,019', 1019, NULL, NULL, 'Free delivery', '7-day returns', 'Amazon.in', 2, 4.0, 220, 
'eyJxIjoiU2hpcnRzIiwiZ2wiOiJpbiIsImhsIjoiZW4iIj9', false),

('939410948846678434', 'H&M Men''s Slim Fit Easy-Iron Shirt', 'Shirts', 'H&M', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSGMCaLWW_8Z5KwGJSj6g6sHEjfyAP2okfsJzUkDQ0F3x1DQV8PbjyQVUfT8caxDRuCjYHj14EiTv3WAh0CPjByWEsSUpZerWI0OZOh_4IJebUJicSphUOjjQ', 
'https://www.google.com/search?q=Shirts', 'https://www.google.com/search?q=Shirts',
'₹1,499', 1499, NULL, NULL, '15-day returns', '15-day returns', 'H&M', 3, 4.5, 5400, 
'eyJxIjoiU2hpcnRzIiwiZ2wiOiJpbiIsImhsIjoiZW4iIj9', false),

('7329491993496795352', 'Roadster Men''s Slim Fit Checked Casual Shirt', 'Shirts', 'Roadster', 
'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTRLOlD_HbM2zlOeFkJzb42mIcej4YAVm1PanV4KbtTf80Sn5MSGFPuivM727mTOt4bIfUA7LvbHID5rjUPMmWwHZTYjw6zTUzQ4BA2uVNAuFlKcx-gXYivZQ', 
'https://www.google.com/search?q=Shirts', 'https://www.google.com/search?q=Shirts',
'₹539', 539, '₹1,199', 55, 'Free delivery by Mon', '14-day returns', 'Myntra', 4, 4.2, 282, 
'eyJxIjoiU2hpcnRzIiwiZ2wiOiJpbiIsImhsIjoiZW4iIj9', false),

('15649744329598028078', 'U Turn Men''s Casual Printed Striped Shirt', 'Shirts', 'U Turn', 
'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRay_9rEJpfEtf6p-arFRb_U3S-nNqOEJJ3ED-bJpST8Bb4xTO_kiJMqXTy8DZUvJqmUoDVMpMTh3l9xUbC11SmF2Pg0j7CqoajWvIKI16Hz9BGJ0YXHavM', 
'https://www.google.com/search?q=Shirts', 'https://www.google.com/search?q=Shirts',
'₹428', 428, NULL, NULL, 'Free delivery', '7-day returns', 'Amazon.in', 5, 3.9, 156, 
'eyJxIjoiU2hpcnRzIiwiZ2wiOiJpbiIsImhsIjoiZW4iIj9', false),

('4989426563309822040', 'Jack & Jones Men''s Regular Fit Checked Shirt', 'Shirts', 'Jack & Jones', 
'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQoIaU35v7aYQ3o2KH7nkg-YCKnfx9j5my_zzywrc2Ba7Ma21Q13en4lgxeqgGH3mbvb2daRFEW5lBQ_QM136_l81Oku1Khphc3p8y8i4m0khpFBrRRWOVt', 
'https://www.google.com/search?q=Shirts', 'https://www.google.com/search?q=Shirts',
'₹2,474', 2474, NULL, NULL, 'Free delivery', '15-day returns', 'Jack & Jones', 6, 4.3, 195, 
'eyJxIjoiU2hpcnRzIiwiZ2wiOiJpbiIsImhsIjoiZW4iIj9', false),

-- Additional Products from other categories (36 items total to reach 60)
-- Adding more from data5-data10

-- Shoes (6 items) - data5
('10838378702688751728', 'Red Tape Men''s Classic Modern Sneakers', 'Shoes', 'Red Tape', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQKfKTt6U0CqQ75PGgx7YOQAyGu-Bp3OVzWKQwmWd5eW4z3pZ4gjPMP1rc8g226LXUIh7TZkP5slVsZ5lSf6c93Yja6jpVzKV4HE3zaETYbX7OGKgnzgodhlg', 'https://www.google.com/search?q=Shoes', 'https://www.google.com/search?q=Shoes',
'₹1,087', 1087, NULL, NULL, 'Free delivery', '7-day returns', 'Myntra - MNow', 1, 4.3, 156, 
'eyJxIjoiU2hvZXMiLCJnbCI6ImluIn0=', false),

('9853688472727924796', 'Bruton Eva Men''s Sport Running Shoes', 'Shoes', 'Bruton', 
'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcREY6eu00OmPs--W6Uv0JZ-SuSBVuOUNGsBSorQPikEEsxmyaKXWWk_IAX19uu2WsD-P9rKjOQDifdltlUUGg-4FIsaOQmmRG0SzIWHZQ1p', 'https://www.google.com/search?q=Shoes', 'https://www.google.com/search?q=Shoes',
'₹428', 428, '₹2,999', 86, 'Free delivery by Wed', '7-day returns', 'Flipkart', 2, 4.0, 95, 
'eyJxIjoiU2hvZXMiLCJnbCI6ImluIn0=', false),

('16081311148112257430', 'Campus Men''s Lam Running Shoes', 'Shoes', 'Campus', 
'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRiWsEypCejUVX2TvJS4A1TR8R70Rn6xXfaYWiMZiq874SuLULWOO_NehIbwXHRfbD_8bZQ12OM6KnsYEfbWwzkRj9X-Hxh9NnileXcr8Yti8duRxPA36HK1w', 'https://www.google.com/search?q=Shoes', 'https://www.google.com/search?q=Shoes',
'₹999', 999, NULL, NULL, 'Free delivery', '7-day returns', 'Amazon.in', 3, 4.7, 44, 
'eyJxIjoiU2hvZXMiLCJnbCI6ImluIn0=', false),

('14306260018038360106', 'Puma Men''s Court Shatter Sneakers', 'Shoes', 'Puma', 
'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSOFz4F6ofM8SvvFteSoZ23AElUxW2aY366VGL0palS0lZXolyvNQj1AqFDm1fNfHxijNfi3U_S0JA7WQeuugaBtIgNkb_JqBzr4gYvIDV6tsibH6iKYqJG', 'https://www.google.com/search?q=Shoes', 'https://www.google.com/search?q=Shoes',
'₹3,499', 3499, NULL, NULL, 'Free delivery by Thu', '10-day returns', 'PUMA India', 4, 4.6, 79, 
'eyJxIjoiU2hvZXMiLCJnbCI6ImluIn0=', false),

('274767504873958936', 'Adidas Unisex Trainers Samba OG', 'Shoes', 'Adidas', 
'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQznPrDHcUssh7QUBri0Ik6m-87aa2iA1d5MGbHvRWrpBCm6-ikxyXAZg0m6mq6fcronF3QNDouyvdtGUJ2hqXeOkAzRAObvUHbeLMoA2iTitz2TODqv6gy', 'https://www.google.com/search?q=Shoes', 'https://www.google.com/search?q=Shoes',
'₹10,999', 10999, NULL, NULL, 'Free delivery', '14-day returns', 'adidas.co.in', 5, 4.7, 31000, 
'eyJxIjoiU2hvZXMiLCJnbCI6ImluIn0=', false),

('9858520125290705792', 'Nike Men''s Run Defy Road-Running Shoes', 'Shoes', 'Nike', 
'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQPAEd4QVs3_yIpv3m0eoJLR-92zS-70MMMRDymMsklx2xhjgT5aS_47bi9EP__bChbX_qcaiPvtfsIwfXHvAkzZt-vcXw7v5RWVftMUyaI1JV0jTeOftkR52Y', 'https://www.google.com/search?q=Shoes', 'https://www.google.com/search?q=Shoes',
'₹3,995', 3995, NULL, NULL, 'Free delivery', '7-day returns', 'Amazon.in', 6, 4.6, 1100, 
'eyJxIjoiU2hvZXMiLCJnbCI6ImluIn0=', false),

-- Smartwatches (6 items) - data6
('15478835650100338383', 'boAt Wave Call 3 Smartwatch', 'Smartwatches', 'boAt', 
'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSBTl7If6DjJ7k1DxgzoTyNDlmkF1iA3SILLzorjqSWP5BOYttPhwJ4zKfDbQ0i1psPhfttan5mCdUraydikMvP5whMQLgVpiIq4XAIa_WLQHwfClIQvEtF', 'https://www.google.com/search?q=Smartwatches', 'https://www.google.com/search?q=Smartwatches',
'₹1,099', 1099, '₹1,399', 21, 'Free delivery', '7-day returns', 'Amazon.in', 1, 3.9, 145, 
'eyJxIjoiU21hcnR3YXRjaGVzIiwiZ2wiOiJpbiJ9', false),

('6331955697556636991', 'Boat Lunar Discovery Pro Smartwatch', 'Smartwatches', 'boAt', 
'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSA7d-ZP3Wej9i7FKjbmznHAOOcNZuleocq7xfxUSrBlfXI1HjqDHjQ7Ux9OeUTzYaNIpBx2bzy_1zWe2hkGk3y9uUMSKZDMUcPii60zPp9', 'https://www.google.com/search?q=Smartwatches', 'https://www.google.com/search?q=Smartwatches',
'₹1,499', 1499, '₹8,999', 83, 'Free delivery', '7-day returns', 'Flipkart', 2, 5.0, 1, 
'eyJxIjoiU21hcnR3YXRjaGVzIiwiZ2wiOiJpbiJ9', false),

('15881853873448888617', 'Titan Heritage Smartwatch', 'Smartwatches', 'Titan', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTqywb1No8Cd29iOyi9I5tTgW2-_I7PrFV8SSKAvd376d3ky3kPL9-cGetnerQCkJ3O2FYqT7r0rFe1HHzuoGK6kD9U0Qk2exUtM3jmBfZV178EN1SWkIoy', 'https://www.google.com/search?q=Smartwatches', 'https://www.google.com/search?q=Smartwatches',
'₹12,495', 12495, NULL, NULL, 'Free delivery', '7-day returns', 'Titan.co.in', 3, 4.1, 18, 
'eyJxIjoiU21hcnR3YXRjaGVzIiwiZ2wiOiJpbiJ9', false),

('17647691977618938887', 'Fastrack Astor FR2 Pro Smart Watch', 'Smartwatches', 'Fastrack', 
'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTy3GapUgeLhmtcwuvTYJEBlDH8TdpdhDSwOaTezIpPqL3m_y_hpC1mPUnmA6-bTbtjVu0JbPPSM4TZ6lzKp3vlrspuwX_FylNqGzEgLpnO52vo4cXxMjVl', 'https://www.google.com/search?q=Smartwatches', 'https://www.google.com/search?q=Smartwatches',
'₹2,799', 2799, '₹3,499', 20, 'Free delivery', '7-day returns', 'Fastrack.in', 4, 4.6, 64, 
'eyJxIjoiU21hcnR3YXRjaGVzIiwiZ2wiOiJpbiJ9', false),

('10867869855746311575', 'Fire-Boltt Assault Smart Watch', 'Smartwatches', 'Fire-Boltt', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRdYDq_Nn0mZ2ZQPajDNjyU952cWgLComy8jbJgOCA36-6Qw0vuDBhQtiieXyfDqPhdZ67Ok3J3a0HYRe03VzSDS4grOTU4SAFif4P1M6hUdYqcn1h_2EZXtA', 'https://www.google.com/search?q=Smartwatches', 'https://www.google.com/search?q=Smartwatches',
'₹899', 899, '₹999', 10, 'Free delivery', '5-day returns', 'Reliance Digital', 5, 4.0, 278, 
'eyJxIjoiU21hcnR3YXRjaGVzIiwiZ2wiOiJpbiJ9', false),

('5380523579311155372', 'CMF by Nothing Watch Pro 2', 'Smartwatches', 'CMF', 
'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ6--gqlsoHsJA8mHWBL2-IKga9KlP5QYSuYCXy1WifmxtnZbaGTJMbXySTfmnO47Xl8SvZcX3qTKycObRTPo4jXkXlz7cUVRHHfSNwYHzUAjSulMTDgAk1', 'https://www.google.com/search?q=Smartwatches', 'https://www.google.com/search?q=Smartwatches',
'₹4,199', 4199, '₹5,499', 24, 'Free delivery', '7-day returns', 'Flipkart', 6, 4.4, 711, 
'eyJxIjoiU21hcnR3YXRjaGVzIiwiZ2wiOiJpbiJ9', false),

-- Tablets (6 items) - data7
('15273870772783703436', 'Motorola Pad 60 Neo', 'Tablets', 'Motorola', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQQMCJau7dBdg1Qwm7nWSAGojMCcBD03CFydH4cIRNnFoRwD1zustcJCa3VztEZYSlN2S8YOAAwYc3Rr2FDHjKsFaq5n-hPLPr4wj-sPXvrozYrZUrPpkgWMA', 'https://www.google.com/search?q=Tablets', 'https://www.google.com/search?q=Tablets',
'₹20,999', 20999, '₹28,000', 25, 'Free delivery', '7-day returns', 'Flipkart', 1, 4.9, 47, 
'eyJxIjoiVGFibGV0cyIsImdsIjoiaW4iIj0=', false),

('10162617433601454326', 'OnePlus Pad Go 2 12.1 Inch Tablet', 'Tablets', 'OnePlus', 
'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTuRA-ilM4QMGzRK8bkFXkZbxYWIF-KCL6YF0uvlX6Dd74tAg_UszG4hIyKGQ4NMyP8VT5IdOC6Wl1jUmqdB_dZcOt0nZWOUSzCuFnuCGYEdxl4ix5rzRhXxg', 'https://www.google.com/search?q=Tablets', 'https://www.google.com/search?q=Tablets',
'₹27,499', 27499, NULL, NULL, 'Free next-day delivery', '7-day returns', 'Vijay Sales', 2, 4.6, 22, 
'eyJxIjoiVGFibGV0cyIsImdsIjoiaW4iIj0=', false),

('1421882119256206838', 'Lenovo Tab Plus Wi-Fi', 'Tablets', 'Lenovo', 
'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRR07ZWrqVe7cwYblJCPOzyBYf704C5Ahfv5S-6xCWesMxjDVCmke9Q9Xadn1mgcd6KcSU677dRyv9LaoCzrNhaYPCLw63nHWci0x-tUfhx39tzbtqapT-s', 'https://www.google.com/search?q=Tablets', 'https://www.google.com/search?q=Tablets',
'₹24,052', 24052, NULL, NULL, 'Free delivery', '7-day returns', 'Amazon.in', 3, 4.5, 8800, 
'eyJxIjoiVGFibGV0cyIsImdsIjoiaW4iIj0=', false),

('13346766733866830216', 'Redmi Pad 2 Wi-Fi+4G Tablet', 'Tablets', 'Redmi', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRxUBOWKxlxb6QQwYoCbUgsOQ1MEoRWLHbVB83-yPpEtEF9nfuzpeoss1K0AuL0foT71jeDAxycdlY5cm3Nrzvjgemb4m5J5iUFEIF1Bdq_aJ9-Hty1FmagfQ', 'https://www.google.com/search?q=Tablets', 'https://www.google.com/search?q=Tablets',
'₹16,999', 16999, NULL, NULL, 'Free delivery', '14-day returns', 'Mi.com', 4, 4.9, 24000, 
'eyJxIjoiVGFibGV0cyIsImdsIjoiaW4iIj0=', false),

('16449376577715406475', 'Realme Pad 2 Lite 10.95" Tablet', 'Tablets', 'Realme', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQOpiAwF-ztrFoXiheqbSWKiXycP9H-vRVZ7n-0CUK4eehAdwEg57B3oTbcx91y4wrZ2VHSadIF4FjLlm7jyuNXA1r_wUZGZq9qxAU6EzUW', 'https://www.google.com/search?q=Tablets', 'https://www.google.com/search?q=Tablets',
'₹13,499', 13499, '₹20,999', 36, 'Free delivery', '7-day returns', 'Flipkart', 5, 5.0, 28, 
'eyJxIjoiVGFibGV0cyIsImdsIjoiaW4iIj0=', false),

('14589130576108203967', 'OnePlus Pad Lite 11-inch Tablet', 'Tablets', 'OnePlus', 
'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQhSAVhDW6vXq-AS0OetU5M8s9FdIoyJRVv6fZL16Dp2j_kARdLgx5KOZkVNBF6oiQPFx6-lOo1BQxtJNmc-4VdxFL0po3JE0yL1dXdCRO_a-oqe1jnQY6_', 'https://www.google.com/search?q=Tablets', 'https://www.google.com/search?q=Tablets',
'₹11,999', 11999, '₹17,999', 33, 'Free delivery', '7-day returns', '93mobiles', 6, 4.8, 36, 
'eyJxIjoiVGFibGV0cyIsImdsIjoiaW4iIj0=', false),

-- Cameras (6 items) - data8
('12524257257243095444', 'Sony a7C II Mirrorless Camera', 'Cameras', 'Sony', 
'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTUhxgtTv3lDFmh16O5O-a3RUb1IqmDs27nHvY1H9NNBzqLLXuflCmM12ZtMjFPZpQgisokjq0TbINSK2DbUvRr9y6o98ms4lrh-wWnPkZ7E8BMPEA4i-SJvw', 'https://www.google.com/search?q=Cameras', 'https://www.google.com/search?q=Cameras',
'₹1,88,989', 188989, NULL, NULL, 'Free delivery', '7-day returns', 'Amazon.in', 1, 4.7, 1300, 
'eyJxIjoiQ2FtZXJhcyIsImdsIjoiaW4iIj0=', false),

('17322494566432735821', 'Canon EOS R10 Mirrorless Camera Lens', 'Cameras', 'Canon', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQCnbzeg7wwIIYKM6m2ucMeam1mPvOh575gfZdV0_MckIjUj3y8cxngrVsU5zpu-Kn8lgOmATMO2RkN4tYGqzfGV66gJwnV4tHnUWYadB-5Gjcx42tcGgYatQ', 'https://www.google.com/search?q=Cameras', 'https://www.google.com/search?q=Cameras',
'₹99,900', 99900, NULL, NULL, 'Free delivery by Thu', '5-day returns', 'Gaffarbhai and Sons', 2, 4.7, 1700, 
'eyJxIjoiQ2FtZXJhcyIsImdsIjoiaW4iIj0=', false),

('9696002233784188853', 'Digitek GoCAM DAC-002 5K 60FPS Action Camera', 'Cameras', 'Digitek', 
'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQtAVEsO952j5SO7sjyGhsc0rjxO9VlJSlXlBeNsPAxj0XDNt12NTjdEFVirkEQNXg1lWejVQqES5rLzedRe8Yc9osr40qVVTFfmQtKL4Ms9IIpGITbNpHJNtk', 'https://www.google.com/search?q=Cameras', 'https://www.google.com/search?q=Cameras',
'₹6,599', 6599, NULL, NULL, 'Free delivery', '7-day returns', 'Digitek', 3, 4.1, 245, 
'eyJxIjoiQ2FtZXJhcyIsImdsIjoiaW4iIj0=', false),

('5270320499780905222', 'Sony a7R Mirrorless Camera', 'Cameras', 'Sony', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTAOShznV0XJ7_Fs2bAaeoqkWawwXY1Jp8B5ctYMFvyhFlF6tI39-ZsLgovoPxRIexb4SzpzLjctO08XGXG4Bj9-CEfBDv3ltj4FQqeoJVvvvGY7KrrheTEZg', 'https://www.google.com/search?q=Cameras', 'https://www.google.com/search?q=Cameras',
'₹1,54,990', 154990, '₹1,62,989', 5, 'Free delivery', '7-day returns', 'ShopatSC', 4, 4.8, 1800, 
'eyJxIjoiQ2FtZXJhcyIsImdsIjoiaW4iIj0=', false),

('4715209617077853292', 'Nikon Z50 Mirrorless Camera', 'Cameras', 'Nikon', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQREHCkxg_02bb62qu3U5v1DpbhuhBPD-p8W0mpS2x2ZGzVAaX3uJFHUmFNti5sTnTk8_Hl3y9EzJI3TTANE_TPP5X17cGsKRIrjsZRHCASJ8xBjevsTTdPBA', 'https://www.google.com/search?q=Cameras', 'https://www.google.com/search?q=Cameras',
'₹1,02,999', 102999, NULL, NULL, 'Free delivery', '7-day returns', 'Amazon.in', 5, 4.2, 310, 
'eyJxIjoiQ2FtZXJhcyIsImdsIjoiaW4iIj0=', false),

('6710428619453827952', 'Fujifilm X-M5 Mirrorless Camera', 'Cameras', 'Fujifilm', 
'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTOEHPujJBH0EMPXxlEI85oNxc5e8_Z9Jln1NLAPU4SBYHuXU75kaDIRsbCwwXByIzcRai7_9sbiBvf3SrsHtQUVyMsUmrNUQ', 'https://www.google.com/search?q=Cameras', 'https://www.google.com/search?q=Cameras',
'₹87,990', 87990, NULL, NULL, 'Free delivery', '7-day returns', 'Kamal Imaging', 6, 4.9, 592, 
'eyJxIjoiQ2FtZXJhcyIsImdsIjoiaW4iIj0=', false),

-- Kitchen Appliances (6 items) - data9
('7146907900588673304', 'Philips 1300W Induction Cooktop', 'Kitchen Appliances', 'Philips', 
'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTLTJdTGen1WP2i3RQf9KbmYQ72nJKVtLO74ggI0A8vpQb0STxpQBChlVZb3LMf_Oc_TMAJuy7nmhqK2KGuMu7amZYXiVd7FhOhA0ft8LkIxoHy8YmZJz71tA', 'https://www.google.com/search?q=Kitchen+Appliances', 'https://www.google.com/search?q=Kitchen+Appliances',
'₹2,999', 2999, '₹3,995', 25, 'Free delivery by Wed', '5-year warranty', 'Flipkart', 1, 5.0, 1, 
'eyJxIjoiS2l0Y2hlbiBBcHBsaWFuY2VzIiwiZ2wiOiJpbiJ9', false),

('5973665163331821018', 'Prestige PIC 16.0 Plus 2000 Watts Induction Cooktop', 'Kitchen Appliances', 'Prestige', 
'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTmom6XSuJOo0fpqlX1XU1yuhJ1FPdf50SxC7E7Y49KFnrbyDaw0BCd_gnDfXtqn7ey2fgzPBjT5Sz4HBgnlD04Lk2I5Or6Ww', 'https://www.google.com/search?q=Kitchen+Appliances', 'https://www.google.com/search?q=Kitchen+Appliances',
'₹2,399', 2399, '₹2,550', 6, 'Free delivery', '3-day returns', 'addmecart', 2, 4.5, 156, 
'eyJxIjoiS2l0Y2hlbiBBcHBsaWFuY2VzIiwiZ2wiOiJpbiJ9', false),

('2219126350753533808', 'Fabiano 2000 Watts Infrared Induction Cooktop', 'Kitchen Appliances', 'Fabiano', 
'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSbJkCm8hDBRGw49spe9kmPy_KDjLllvbvQhNV7qeCHsqLlJzezAnIUjoeMrWdIeeu9lnKa5PEWjQWe7zGizI957EiXuscSMw', 'https://www.google.com/search?q=Kitchen+Appliances', 'https://www.google.com/search?q=Kitchen+Appliances',
'₹2,699', 2699, NULL, NULL, 'Free delivery', 'Free 5-day returns', 'JioMart Electronics', 3, 4.7, 89, 
'eyJxIjoiS2l0Y2hlbiBBcHBsaWFuY2VzIiwiZ2wiOiJpbiJ9', false),

('3500593400401535913', 'Pigeon Favourite 1800 W Induction Cooktop', 'Kitchen Appliances', 'Pigeon', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRnGy8BClnUSvVhFEBE8IfLBlIov84OiShj3s1jgivWV4IzKPdZjTLRijY13xcH69Jd5iVObYrQJW5PnM0SHZHIIPgXWxNEAPDsQDLRK41o', 'https://www.google.com/search?q=Kitchen+Appliances', 'https://www.google.com/search?q=Kitchen+Appliances',
'₹2,599', 2599, '₹3,195', 19, 'Free delivery by Wed', '2-year warranty', 'Flipkart', 4, 4.1, 257, 
'eyJxIjoiS2l0Y2hlbiBBcHBsaWFuY2VzIiwiZ2wiOiJpbiJ9', false),

('15477500224172659229', 'Philips Induction Cooktop HD4938/01', 'Kitchen Appliances', 'Philips', 
'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQavzjh0xZTpJRZAmcbvvf-QrHgvqfOCrc37Keuyf7GdAoFN04KGcClTvgAJMH0z_yG17GK9oqBieuMGKU4B_tvRreP17uF', 'https://www.google.com/search?q=Kitchen+Appliances', 'https://www.google.com/search?q=Kitchen+Appliances',
'₹1,499', 1499, NULL, NULL, 'Free delivery', '1-year warranty', 'Tradeindia.com', 5, 4.1, 29, 
'eyJxIjoiS2l0Y2hlbiBBcHBsaWFuY2VzIiwiZ2wiOiJpbiJ9', false),

('7765181718015691976', 'NutriPro Juicer Mixer Grinder Smoothie Maker', 'Kitchen Appliances', 'NutriPro', 
'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTa7ZA2Y7QSYd8ssXVbxDFQjYNNqYjn9kBR1YqwPe6fnVOidVN_tnFqyAJUFLv7RJ8_ZNZMJXT1OrN7Kl7-jgMydT2HBUL7UeAGw693gBqw4k3Q9n0LlV61UA', 'https://www.google.com/search?q=Kitchen+Appliances', 'https://www.google.com/search?q=Kitchen+Appliances',
'₹1,599', 1599, NULL, NULL, 'Free delivery', '7-day returns', 'skyshopy', 6, 4.8, 342, 
'eyJxIjoiS2l0Y2hlbiBBcHBsaWFuY2VzIiwiZ2wiOiJpbiJ9', false),

-- Furniture (6 items) - data10
('8648579975755918755', 'Home Centre Lexus Savanna King Bed', 'Furniture', 'Home Centre', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ4xNJzujj01kBsqhT9X3vK8jdRkHVw-3hmmkNYzj7x42u8sQOk4ZjWMv7NalvK-5MW9QAanpqK7NINBqWU3xSLmCS0pta76LL5cvxJvKgA', 'https://www.google.com/search?q=Furniture', 'https://www.google.com/search?q=Furniture',
'₹30,999', 30999, NULL, NULL, 'Free delivery', '30-day returns', 'Home Centre', 1, 4.8, 267, 
'eyJxIjoiRnVybml0dXJlIiwiZ2wiOiJpbiJ9', false),

('17890926606958316999', 'FURNEASER Pinnova Modern Wooden TV Unit', 'Furniture', 'FURNEASER', 
'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRUf5m-zJrRNHH27FFUOPryiMQlpPNI9BEkOWzmiJH3W08TjfIdIQWR-i0rfMAOsEtK8ci7f8vbZi6iv4jJHLH3gq-LWIeMQMv3R5knEejs', 'https://www.google.com/search?q=Furniture', 'https://www.google.com/search?q=Furniture',
'₹11,399', 11399, NULL, NULL, 'Free delivery', '14-day returns', 'Amazon.in', 2, 4.6, 1800, 
'eyJxIjoiRnVybml0dXJlIiwiZ2wiOiJpbiJ9', false),

('12338481791970943530', 'Rani Arts & Teak Chancellor Sofa Set Furniture', 'Furniture', 'Rani Arts & Teak', 
'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRQkekjrYCQcLvdMDPXj-QCUsRKhfNhIS1OyhNwH70kFdSeHW44u8m0IZmtpKC8usMJpHT9HK0ixCK6HOXZkK4d6jLf10jHzQsszTn4HiJm', 'https://www.google.com/search?q=Furniture', 'https://www.google.com/search?q=Furniture',
'₹10,000', 10000, NULL, NULL, 'Free delivery', '14-day returns', 'Rani Arts & Teak', 3, 4.7, 198, 
'eyJxIjoiRnVybml0dXJlIiwiZ2wiOiJpbiJ9', false),

('13379310075083426427', 'Home Centre Cinnamon Half Leather 3-Seater Sofa', 'Furniture', 'Home Centre', 
'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ4Pvd2zD-W93KTU80W2VI7BmGd8_Ugd86ODhO3kIOtSkHcpUlpRv76tLNLj7SHkDQF25xP-lIYa7qA1CC8rEfYhqltbyVVWcvAQdsQ1-2_', 'https://www.google.com/search?q=Furniture', 'https://www.google.com/search?q=Furniture',
'₹89,999', 89999, NULL, NULL, 'Free delivery', '30-day returns', 'Home Centre', 4, 4.9, 45, 
'eyJxIjoiRnVybml0dXJlIiwiZ2wiOiJpbiJ9', false),

('2450682106427172530', 'Bharat Lifestyle Amsterdam Engineered Wood Bed', 'Furniture', 'Bharat Lifestyle', 
'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRx5NC-WQRdt6qoWZOUPprvanpXMCrkrkei653OBueOBQh0lzjr_0B_eeUO8MOVCRcHrIfxUNLmYF2OnInP0XU1wQiDFpeztpHpFHTwZEN0', 'https://www.google.com/search?q=Furniture', 'https://www.google.com/search?q=Furniture',
'₹9,999', 9999, NULL, NULL, 'Free delivery', '15-day returns', 'Amazon.in', 5, 4.5, 2340, 
'eyJxIjoiRnVybml0dXJlIiwiZ2wiOiJpbiJ9', false),

('13785684004961858812', 'IKEA SONGESAND Bedroom Furniture Set of 5', 'Furniture', 'IKEA', 
'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQOnkosRcTEKR24yt1aeekNlhvbbb35VX3ha44iir5bh_X-In_C7AmZkl1Bq3tFqtlLB7x4wwXKvztlKs0NE5v_D9U10zynfkl47GA2CvCKj50Hx57j2DOi', 'https://www.google.com/search?q=Furniture', 'https://www.google.com/search?q=Furniture',
'₹59,950', 59950, NULL, NULL, 'Free delivery/assembly', '365-day returns', 'IKEA.in', 6, 4.6, 30, 
'eyJxIjoiRnVybml0dXJlIiwiZ2wiOiJpbiJ9', false);
