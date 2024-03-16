#!/usr/bin/env python3
""" Mixed list """
from typing import Union, List

def sum_mixed_list(mxd_lst: List[Union[int, float]]) -> float:
    """ Return sum as a float """
    return float(sum(mxd_lst))

def sum_mixed_list2(mxd_lst: List[Union(int, float)]) -> float:
    """Returns the sum of floats and integers"""
    return float(sum(mxd_lst))

