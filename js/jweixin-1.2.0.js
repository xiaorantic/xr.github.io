!function(e, n) {
    "function" == typeof define && (define.amd || define.cmd) ? define(function() {
        return n(e)
    }) : n(e, !0)
}(this, function(e, n) {
    function i(n, i, t) {
        e.WeixinJSBridge ? WeixinJSBridge.invoke(n, o(i), function(e) {
            c(n, e, t)
        }) : l(n, t)
    }
    function t(n, i, t) {
        e.WeixinJSBridge ? WeixinJSBridge.on(n, function(e) {
            t && t.trigger && t.trigger(e),
                c(n, e, i)
        }) : t ? l(n, t) : l(n, i)
    }
    function o(e) {
        return e = e || {},
            e.appId = A.appId,
            e.verifyAppId = A.appId,
            e.verifySignType = "sha1",
            e.verifyTimestamp = A.timestamp + "",
            e.verifyNonceStr = A.nonceStr,
            e.verifySignature = A.signature,
            e
    }
    function r(e) {
        return {
            timeStamp: e.timestamp + "",
            nonceStr: e.nonceStr,
            package: e.package,
            paySign: e.paySign,
            signType: e.signType || "SHA1"
        }
    }
    function a(e) {
        return e.postalCode = e.addressPostalCode,
            delete e.addressPostalCode,
            e.provinceName = e.proviceFirstStageName,
            delete e.proviceFirstStageName,
            e.cityName = e.addressCitySecondStageName,
            delete e.addressCitySecondStageName,
            e.countryName = e.addressCountiesThirdStageName,
            delete e.addressCountiesThirdStageName,
            e.detailInfo = e.addressDetailInfo,
            delete e.addressDetailInfo,
            e
    }
    function c(e, n, i) {
        "openEnterpriseChat" == e && (n.errCode = n.err_code),
            delete n.err_code,
            delete n.err_desc,
            delete n.err_detail;
        var t = n.errMsg;
        t || (t = n.err_msg,
            delete n.err_msg,
            t = s(e, t),
            n.errMsg = t),
        (i = i || {})._complete && (i._complete(n),
            delete i._complete),
            t = n.errMsg || "",
        A.debug && !i.isInnerInvoke && alert(JSON.stringify(n));
        var o = t.indexOf(":");
        switch (t.substring(o + 1)) {
            case "ok":
                i.success && i.success(n);
                break;
            case "cancel":
                i.cancel && i.cancel(n);
                break;
            default:
                i.fail && i.fail(n)
        }
        i.complete && i.complete(n)
    }
    function s(e, n) {
        var i = e
            , t = h[i];
        t && (i = t);
        var o = "ok";
        if (n) {
            var r = n.indexOf(":");
            "confirm" == (o = n.substring(r + 1)) && (o = "ok"),
            "failed" == o && (o = "fail"),
            -1 != o.indexOf("failed_") && (o = o.substring(7)),
            -1 != o.indexOf("fail_") && (o = o.substring(5)),
            "access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != o || (o = "permission denied"),
            "config" == i && "function not exist" == o && (o = "ok"),
            "" == o && (o = "fail")
        }
        return n = i + ":" + o
    }
    function d(e) {
        if (e) {
            for (var n = 0, i = e.length; n < i; ++n) {
                var t = e[n]
                    , o = g[t];
                o && (e[n] = o)
            }
            return e
        }
    }
    function l(e, n) {
        if (!(!A.debug || n && n.isInnerInvoke)) {
            var i = h[e];
            i && (e = i),
            n && n._complete && delete n._complete,
                console.log('"' + e + '",', n || "")
        }
    }
    function u(e) {
        if (!(_ || w || A.debug || M < "6.0.2" || V.systemType < 0)) {
            var n = new Image;
            V.appId = A.appId,
                V.initTime = C.initEndTime - C.initStartTime,
                V.preVerifyTime = C.preVerifyEndTime - C.preVerifyStartTime,
                N.getNetworkType({
                    isInnerInvoke: !0,
                    success: function(e) {
                        V.networkType = e.networkType;
                        var i = "https://open.weixin.qq.com/sdk/report?v=" + V.version + "&o=" + V.isPreVerifyOk + "&s=" + V.systemType + "&c=" + V.clientVersion + "&a=" + V.appId + "&n=" + V.networkType + "&i=" + V.initTime + "&p=" + V.preVerifyTime + "&u=" + V.url;
                        n.src = i
                    }
                })
        }
    }
    function p() {
        return (new Date).getTime()
    }
    function f(n) {
        T && (e.WeixinJSBridge ? n() : S.addEventListener && S.addEventListener("WeixinJSBridgeReady", n, !1))
    }
    function m() {
        N.invoke || (N.invoke = function(n, i, t) {
                e.WeixinJSBridge && WeixinJSBridge.invoke(n, o(i), t)
            }
                ,
                N.on = function(n, i) {
                    e.WeixinJSBridge && WeixinJSBridge.on(n, i)
                }
        )
    }
    if (!e.jWeixin) {
        var g = {
            config: "preVerifyJSAPI",
            onMenuShareTimeline: "menu:share:timeline",
            onMenuShareAppMessage: "menu:share:appmessage",
            onMenuShareQQ: "menu:share:qq",
            onMenuShareWeibo: "menu:share:weiboApp",
            onMenuShareQZone: "menu:share:QZone",
            previewImage: "imagePreview",
            getLocation: "geoLocation",
            openProductSpecificView: "openProductViewWithPid",
            addCard: "batchAddCard",
            openCard: "batchViewCard",
            chooseWXPay: "getBrandWCPayRequest",
            openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
            startSearchBeacons: "startMonitoringBeacons",
            stopSearchBeacons: "stopMonitoringBeacons",
            onSearchBeacons: "onBeaconsInRange",
            consumeAndShareCard: "consumedShareCard",
            openAddress: "editAddress"
        }
            , h = function() {
            var e = {};
            for (var n in g)
                e[g[n]] = n;
            return e
        }()
            , S = e.document
            , y = S.title
            , v = navigator.userAgent.toLowerCase()
            , I = navigator.platform.toLowerCase()
            , _ = !(!I.match("mac") && !I.match("win"))
            , w = -1 != v.indexOf("wxdebugger")
            , T = -1 != v.indexOf("micromessenger")
            , k = -1 != v.indexOf("android")
            , x = -1 != v.indexOf("iphone") || -1 != v.indexOf("ipad")
            , M = function() {
            var e = v.match(/micromessenger\/(\d+\.\d+\.\d+)/) || v.match(/micromessenger\/(\d+\.\d+)/);
            return e ? e[1] : ""
        }()
            , C = {
            initStartTime: p(),
            initEndTime: 0,
            preVerifyStartTime: 0,
            preVerifyEndTime: 0
        }
            , V = {
            version: 1,
            appId: "",
            initTime: 0,
            preVerifyTime: 0,
            networkType: "",
            isPreVerifyOk: 1,
            systemType: x ? 1 : k ? 2 : -1,
            clientVersion: M,
            url: encodeURIComponent(location.href)
        }
            , A = {}
            , P = {
            _completes: []
        }
            , L = {
            state: 0,
            data: {}
        };
        f(function() {
            C.initEndTime = p()
        });
        var B = !1
            , O = []
            , N = {
            config: function(e) {
                A = e,
                    l("config", e);
                var n = !1 !== A.check;
                f(function() {
                    if (n)
                        i(g.config, {
                            verifyJsApiList: d(A.jsApiList)
                        }, function() {
                            P._complete = function(e) {
                                C.preVerifyEndTime = p(),
                                    L.state = 1,
                                    L.data = e
                            }
                                ,
                                P.success = function(e) {
                                    V.isPreVerifyOk = 0
                                }
                                ,
                                P.fail = function(e) {
                                    P._fail ? P._fail(e) : L.state = -1
                                }
                            ;
                            var e = P._completes;
                            return e.push(function() {
                                u()
                            }),
                                P.complete = function(n) {
                                    for (var i = 0, t = e.length; i < t; ++i)
                                        e[i]();
                                    P._completes = []
                                }
                                ,
                                P
                        }()),
                            C.preVerifyStartTime = p();
                    else {
                        L.state = 1;
                        for (var e = P._completes, t = 0, o = e.length; t < o; ++t)
                            e[t]();
                        P._completes = []
                    }
                }),
                A.beta && m()
            },
            ready: function(e) {
                0 != L.state ? e() : (P._completes.push(e),
                !T && A.debug && e())
            },
            error: function(e) {
                M < "6.0.2" || (-1 == L.state ? e(L.data) : P._fail = e)
            },
            checkJsApi: function(e) {
                var n = function(e) {
                    var n = e.checkResult;
                    for (var i in n) {
                        var t = h[i];
                        t && (n[t] = n[i],
                            delete n[i])
                    }
                    return e
                };
                i("checkJsApi", {
                    jsApiList: d(e.jsApiList)
                }, (e._complete = function(e) {
                    if (k) {
                        var i = e.checkResult;
                        i && (e.checkResult = JSON.parse(i))
                    }
                    e = n(e)
                }
                    ,
                    e))
            },
            onMenuShareTimeline: function(e) {
                t(g.onMenuShareTimeline, {
                    complete: function() {
                        i("shareTimeline", {
                            title: e.title || y,
                            desc: e.title || y,
                            img_url: e.imgUrl || "",
                            link: e.link || location.href,
                            type: e.type || "link",
                            data_url: e.dataUrl || ""
                        }, e)
                    }
                }, e)
            },
            onMenuShareAppMessage: function(e) {
                t(g.onMenuShareAppMessage, {
                    complete: function(n) {
                        "favorite" === n.scene ? i("sendAppMessage", {
                            title: e.title || y,
                            desc: e.desc || "",
                            link: e.link || location.href,
                            img_url: e.imgUrl || "",
                            type: e.type || "link",
                            data_url: e.dataUrl || ""
                        }) : i("sendAppMessage", {
                            title: e.title || y,
                            desc: e.desc || "",
                            link: e.link || location.href,
                            img_url: e.imgUrl || "",
                            type: e.type || "link",
                            data_url: e.dataUrl || ""
                        }, e)
                    }
                }, e)
            },
            onMenuShareQQ: function(e) {
                t(g.onMenuShareQQ, {
                    complete: function() {
                        i("shareQQ", {
                            title: e.title || y,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            },
            onMenuShareWeibo: function(e) {
                t(g.onMenuShareWeibo, {
                    complete: function() {
                        i("shareWeiboApp", {
                            title: e.title || y,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            },
            onMenuShareQZone: function(e) {
                t(g.onMenuShareQZone, {
                    complete: function() {
                        i("shareQZone", {
                            title: e.title || y,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            },
            startRecord: function(e) {
                i("startRecord", {}, e)
            },
            stopRecord: function(e) {
                i("stopRecord", {}, e)
            },
            onVoiceRecordEnd: function(e) {
                t("onVoiceRecordEnd", e)
            },
            playVoice: function(e) {
                i("playVoice", {
                    localId: e.localId
                }, e)
            },
            pauseVoice: function(e) {
                i("pauseVoice", {
                    localId: e.localId
                }, e)
            },
            stopVoice: function(e) {
                i("stopVoice", {
                    localId: e.localId
                }, e)
            },
            onVoicePlayEnd: function(e) {
                t("onVoicePlayEnd", e)
            },
            uploadVoice: function(e) {
                i("uploadVoice", {
                    localId: e.localId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e)
            },
            downloadVoice: function(e) {
                i("downloadVoice", {
                    serverId: e.serverId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e)
            },
            translateVoice: function(e) {
                i("translateVoice", {
                    localId: e.localId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e)
            },
            chooseImage: function(e) {
                i("chooseImage", {
                    scene: "1|2",
                    count: e.count || 9,
                    sizeType: e.sizeType || ["original", "compressed"],
                    sourceType: e.sourceType || ["album", "camera"]
                }, (e._complete = function(e) {
                    if (k) {
                        var n = e.localIds;
                        try {
                            n && (e.localIds = JSON.parse(n))
                        } catch (e) {}
                    }
                }
                    ,
                    e))
            },
            getLocation: function(e) {},
            previewImage: function(e) {
                i(g.previewImage, {
                    current: e.current,
                    urls: e.urls
                }, e)
            },
            uploadImage: function(e) {
                i("uploadImage", {
                    localId: e.localId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e)
            },
            downloadImage: function(e) {
                i("downloadImage", {
                    serverId: e.serverId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e)
            },
            getLocalImgData: function(e) {
                !1 === B ? (B = !0,
                    i("getLocalImgData", {
                        localId: e.localId
                    }, (e._complete = function(e) {
                        if (B = !1,
                        O.length > 0) {
                            var n = O.shift();
                            wx.getLocalImgData(n)
                        }
                    }
                        ,
                        e))) : O.push(e)
            },
            getNetworkType: function(e) {
                var n = function(e) {
                    var n = e.errMsg;
                    e.errMsg = "getNetworkType:ok";
                    var i = e.subtype;
                    if (delete e.subtype,
                        i)
                        e.networkType = i;
                    else {
                        var t = n.indexOf(":")
                            , o = n.substring(t + 1);
                        switch (o) {
                            case "wifi":
                            case "edge":
                            case "wwan":
                                e.networkType = o;
                                break;
                            default:
                                e.errMsg = "getNetworkType:fail"
                        }
                    }
                    return e
                };
                i("getNetworkType", {}, (e._complete = function(e) {
                    e = n(e)
                }
                    ,
                    e))
            },
            openLocation: function(e) {
                i("openLocation", {
                    latitude: e.latitude,
                    longitude: e.longitude,
                    name: e.name || "",
                    address: e.address || "",
                    scale: e.scale || 28,
                    infoUrl: e.infoUrl || ""
                }, e)
            },
            getLocation: function(e) {
                e = e || {},
                    i(g.getLocation, {
                        type: e.type || "wgs84"
                    }, (e._complete = function(e) {
                        delete e.type
                    }
                        ,
                        e))
            },
            hideOptionMenu: function(e) {
                i("hideOptionMenu", {}, e)
            },
            showOptionMenu: function(e) {
                i("showOptionMenu", {}, e)
            },
            closeWindow: function(e) {
                i("closeWindow", {}, e = e || {})
            },
            hideMenuItems: function(e) {
                i("hideMenuItems", {
                    menuList: e.menuList
                }, e)
            },
            showMenuItems: function(e) {
                i("showMenuItems", {
                    menuList: e.menuList
                }, e)
            },
            hideAllNonBaseMenuItem: function(e) {
                i("hideAllNonBaseMenuItem", {}, e)
            },
            showAllNonBaseMenuItem: function(e) {
                i("showAllNonBaseMenuItem", {}, e)
            },
            scanQRCode: function(e) {
                i("scanQRCode", {
                    needResult: (e = e || {}).needResult || 0,
                    scanType: e.scanType || ["qrCode", "barCode"]
                }, (e._complete = function(e) {
                    if (x) {
                        var n = e.resultStr;
                        if (n) {
                            var i = JSON.parse(n);
                            e.resultStr = i && i.scan_code && i.scan_code.scan_result
                        }
                    }
                }
                    ,
                    e))
            },
            openAddress: function(e) {
                i(g.openAddress, {}, (e._complete = function(e) {
                    e = a(e)
                }
                    ,
                    e))
            },
            openProductSpecificView: function(e) {
                i(g.openProductSpecificView, {
                    pid: e.productId,
                    view_type: e.viewType || 0,
                    ext_info: e.extInfo
                }, e)
            },
            addCard: function(e) {
                for (var n = e.cardList, t = [], o = 0, r = n.length; o < r; ++o) {
                    var a = n[o]
                        , c = {
                        card_id: a.cardId,
                        card_ext: a.cardExt
                    };
                    t.push(c)
                }
                i(g.addCard, {
                    card_list: t
                }, (e._complete = function(e) {
                    var n = e.card_list;
                    if (n) {
                        for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {
                            var o = n[i];
                            o.cardId = o.card_id,
                                o.cardExt = o.card_ext,
                                o.isSuccess = !!o.is_succ,
                                delete o.card_id,
                                delete o.card_ext,
                                delete o.is_succ
                        }
                        e.cardList = n,
                            delete e.card_list
                    }
                }
                    ,
                    e))
            },
            chooseCard: function(e) {
                i("chooseCard", {
                    app_id: A.appId,
                    location_id: e.shopId || "",
                    sign_type: e.signType || "SHA1",
                    card_id: e.cardId || "",
                    card_type: e.cardType || "",
                    card_sign: e.cardSign,
                    time_stamp: e.timestamp + "",
                    nonce_str: e.nonceStr
                }, (e._complete = function(e) {
                    e.cardList = e.choose_card_info,
                        delete e.choose_card_info
                }
                    ,
                    e))
            },
            openCard: function(e) {
                for (var n = e.cardList, t = [], o = 0, r = n.length; o < r; ++o) {
                    var a = n[o]
                        , c = {
                        card_id: a.cardId,
                        code: a.code
                    };
                    t.push(c)
                }
                i(g.openCard, {
                    card_list: t
                }, e)
            },
            consumeAndShareCard: function(e) {
                i(g.consumeAndShareCard, {
                    consumedCardId: e.cardId,
                    consumedCode: e.code
                }, e)
            },
            chooseWXPay: function(e) {
                i(g.chooseWXPay, r(e), e)
            },
            openEnterpriseRedPacket: function(e) {
                i(g.openEnterpriseRedPacket, r(e), e)
            },
            startSearchBeacons: function(e) {
                i(g.startSearchBeacons, {
                    ticket: e.ticket
                }, e)
            },
            stopSearchBeacons: function(e) {
                i(g.stopSearchBeacons, {}, e)
            },
            onSearchBeacons: function(e) {
                t(g.onSearchBeacons, e)
            },
            openEnterpriseChat: function(e) {
                i("openEnterpriseChat", {
                    useridlist: e.userIds,
                    chatname: e.groupName
                }, e)
            }
        }
            , E = 1
            , b = {};
        return S.addEventListener("error", function(e) {
            if (!k) {
                var n = e.target
                    , i = n.tagName
                    , t = n.src;
                if (("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) && -1 != t.indexOf("wxlocalresource://")) {
                    e.preventDefault(),
                        e.stopPropagation();
                    var o = n["wx-id"];
                    if (o || (o = E++,
                        n["wx-id"] = o),
                        b[o])
                        return;
                    b[o] = !0,
                        wx.ready(function() {
                            wx.getLocalImgData({
                                localId: t,
                                success: function(e) {
                                    n.src = e.localData
                                }
                            })
                        })
                }
            }
        }, !0),
            S.addEventListener("load", function(e) {
                if (!k) {
                    var n = e.target
                        , i = n.tagName;
                    n.src;
                    if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {
                        var t = n["wx-id"];
                        t && (b[t] = !1)
                    }
                }
            }, !0),
        n && (e.wx = e.jWeixin = N),
            N
    }
});
