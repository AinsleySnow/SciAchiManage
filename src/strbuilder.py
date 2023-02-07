class StringBuilder:
    def __init__(self, args: list = None) -> None:
        self.arglist = []
        if args:
            self.arglist.extend(args)

    def __str__(self) -> str:
        return self.join()

    def append(self, *ele) -> None:
        self.arglist.extend(ele)

    def build(self) -> str:
        return ''.join(*self.arglist)
