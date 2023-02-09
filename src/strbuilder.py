class StringBuilder:
    def __init__(self, args: list = None) -> None:
        self.__arglist_ = []
        if args:
            self.__arglist_.extend(args)

    def __str__(self) -> str:
        return self.join()

    def append(self, *ele) -> None:
        self.__arglist_.extend(*ele)

    def extend(self, eles: list) -> None:
        self.__arglist_.extend(eles)

    def build(self) -> str:
        return ''.join(*self.__arglist_)
