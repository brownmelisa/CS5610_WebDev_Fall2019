defmodule Fact do

  # fact(1) = 1
  # fact(x) = x * fact(x - 1)
  #
  # Accumulator:
  #  fact(1, acc) = acc
  #  fact(x, acc) = fact(x-1, x * acc)
  #  fact(x) = fact(x, 1)

  # provide one argument interface to users
  # function is defined by name and number of args, so this is like two diff
  # functions
  def fact(x) do
    fact(x, 1)
  end

  def fact(x, acc) when x <= 1 do
    acc
  end

  # tail call, same as calling a while loop
  # optimization on tail call, means we can write an infinite loop
  def fact(x, acc) do
    fact(x - 1, x * acc)
  end
end

