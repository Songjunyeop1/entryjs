import { PIXIText } from './pixi/text/PIXIText';
import { PIXITempStore } from './pixi/etc/PIXITempStore';

export default class PIXIHelper {
    static text(str, font, color, textBaseline, textAlign) {
        var reg = /((\d+)(pt|sp|px))?\s*(.+)/gi;
        var result = reg.exec(font) || [];
        var fontName = (result[4]) || "NanumGothic";
        var size = (result[1]) || "10pt";

        // console.log({
        //     input: font,
        //     fontName: fontName,
        //     size: size
        // });

        // var t = new PIXI.Text(str, {
        var t = new PIXIText(str, {
            fontFamily: fontName,
            fontSize: size,
            fill: color,
            textBaseline: textBaseline || 'alphabetic',
            align: textAlign || "left",
            miterLimit: 2.5 //createjs default value
        });
        return t;
    }

    /**
     * createjs.Text.getMeasuredWidth() 의 pollyfill
     * @param pixiText
     */
    static textWidth(pixiText) {
        return pixiText.width;
    }
    static textHeight(pixiText) {
        return pixiText.height;
    }
    static getMeasuredLineHeight(pixiText) {
        return pixiText.height;
    }


    static cacheIfHasFilters(that) {
        // if (!_.isEmpty(that.object.filters)) that.cache();
        // else that.object.uncache();
    }

    /**
     *
     * @param {PIXI.Sprite} sp
     * @param {HTMLImageElement} image
     */
    static setTextureToPIXISprite(sp, image) {
        sp.texture = PIXI.Texture.from(image);
    }


    static createjsUncache(target) {
        // object.uncache()
    }

    /**
     * #ff00ff --> 0xff00ff
     * @param strColor
     */
    static colorToUint(strColor) {
        return strColor ? Number(strColor.replace("#", "0x")) : undefined;
    }

    static needDestroy(target) {

    }

    static todo(msg) {

    }

    /**
     * createjs.DisplayObject#getTransformBound()
     * @param {PIXI.DisplayObject} target
     */
    static getTransformBound(target) {
        var bounds = target.getLocalBounds(PIXITempStore.rect);

        var x = bounds.x, y = bounds.y, width = bounds.width, height = bounds.height;
        var mtx = PIXITempStore.matrix1;
        target.localTransform.copy(mtx);

        if (x || y) {
            var mat2 = PIXITempStore.matrix2.identity().translate(-x,-y);
            mtx.append(mat2);
        }

        var x_a = width*mtx.a, x_b = width*mtx.b;
        var y_c = height*mtx.c, y_d = height*mtx.d;
        var tx = mtx.tx, ty = mtx.ty;

        var minX = tx, maxX = tx, minY = ty, maxY = ty;

        if ((x = x_a + tx) < minX) { minX = x; } else if (x > maxX) { maxX = x; }
        if ((x = x_a + y_c + tx) < minX) { minX = x; } else if (x > maxX) { maxX = x; }
        if ((x = y_c + tx) < minX) { minX = x; } else if (x > maxX) { maxX = x; }

        if ((y = x_b + ty) < minY) { minY = y; } else if (y > maxY) { maxY = y; }
        if ((y = x_b + y_d + ty) < minY) { minY = y; } else if (y > maxY) { maxY = y; }
        if ((y = y_d + ty) < minY) { minY = y; } else if (y > maxY) { maxY = y; }

        bounds.x = minX;
        bounds.y = minY;
        bounds.width = maxX-minX;
        bounds.height = maxY-minY;
        return bounds;
    }


}

