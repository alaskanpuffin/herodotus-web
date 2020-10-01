module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "~bootstrap/scss/_functions"; \
                    @import "~bootstrap/scss/_variables"; \
                    @import "@/assets/css/_variables"; \
                    @import "~bootstrap/scss/mixins/_breakpoints";'
            }
        }
    }
}